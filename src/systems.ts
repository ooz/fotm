import { ItemType, itemTypeToItem } from "./item";
import { State } from "./state";
import { messageToString, TV_MESSAGE } from "./tv";

export function updateSystemsPerTurn(state: State): State {
    state = updateTvMessage(state)
    state = updateItems(state)
    state = updatePoints(state)

    return state;
}

let tvUpdateCounter = 0
function updateTvMessage(state: State): State {
    if (tvUpdateCounter <= 0 && state.tv) {
        const theme = state.rng.getItem([TV_MESSAGE.EDGY, TV_MESSAGE.MAINSTREAM, TV_MESSAGE.EMOJIS, TV_MESSAGE.LETTER, TV_MESSAGE.NUMBER, TV_MESSAGE.SYMBOL, TV_MESSAGE.LOVE, TV_MESSAGE.NATURE, TV_MESSAGE.NUCLEAR, TV_MESSAGE.COLOR])

        state.tv.message = theme
        state.tv.messageStr = messageToString(state, theme)

        tvUpdateCounter = state.rng.getItem([Math.ceil((state.width + state.height) * (2/3)), state.width + state.height, Math.ceil((state.width + state.height) * 1.5)])
    }

    tvUpdateCounter--;

    return state
}

let itemUpdateCounter = 0
function updateItems(state: State): State {
    if (itemUpdateCounter <= 0 && state.positionToItem) {
        for (const [posKey, item] of Object.entries(state.positionToItem)) {
            const [x, y] = posKey.split(",").map(Number)
            const itemType = state.rng.getItem([ItemType.EMOJI, ItemType.LETTER, ItemType.NUMBER, ItemType.SYMBOL, ItemType.COLOR])

            state.positionToItem[posKey] = itemTypeToItem(state, itemType)
        }

        itemUpdateCounter = state.rng.getItem([18, 20, 22])
    }

    itemUpdateCounter--;

    return state
}

function updatePoints(state: State): State {
    if (!state.tv || state.tv.message === null) return state;

    const theme = state.tv.message;
    const allActors = Object.values(state.actors);
    if (state.player) {
        allActors.push(state.player);
    }

    const total = allActors.length;
    if (total === 0) return state;

    // Pre-calculate frequencies for Edgy/Mainstream
    const iconCounts: Record<string, number> = {};
    const colorCounts: Record<string, number> = {};

    if (theme === TV_MESSAGE.EDGY || theme === TV_MESSAGE.MAINSTREAM) {
        for (const actor of allActors) {
            iconCounts[actor.icon] = (iconCounts[actor.icon] || 0) + 1;
            colorCounts[actor.color] = (colorCounts[actor.color] || 0) + 1;
        }
    }

    const emojis = ["🫠", "👾", "🤘", "🥷", "🦉", "🐸", "🐢", "🌲", "🍩", "🚀", "🥋", "🎭", "💰", "☢️"];
    const nature = ["🦉", "🐸", "🐢", "🌲"];
    const nuclear = ["☢️"];
    const symbols = ["!", "#", "$", "%", "="];

    for (const actor of allActors) {
        let points = 0;

        switch (theme) {
            case TV_MESSAGE.EMOJIS:
                if (emojis.includes(actor.icon)) points = 1; else points = -1;
                break;
            case TV_MESSAGE.LETTER:
                if (/^[A-Z]$/.test(actor.icon)) points = 1; else points = -1;
                break;
            case TV_MESSAGE.NUMBER:
                if (/^[0-9]$/.test(actor.icon)) points = 1; else points = -1;
                break;
            case TV_MESSAGE.SYMBOL:
                if (symbols.includes(actor.icon)) points = 1; else points = -1;
                break;
            case TV_MESSAGE.COLOR:
                if (actor.color !== "#fff") points = 1; else points = -1;
                break;
            case TV_MESSAGE.LOVE:
                if (actor.color === "#f00" || actor.icon === "❤️") points = 1; else points = -1;
                break;
            case TV_MESSAGE.NATURE:
                if (nature.includes(actor.icon)) points = 1; else points = -1;
                break;
            case TV_MESSAGE.NUCLEAR:
                if (nuclear.includes(actor.icon)) points = 1; else points = -1;
                break;
            case TV_MESSAGE.EDGY:
                if ((iconCounts[actor.icon] || 0) / total < 0.10) points = 1; else points = -1;
                break;
            case TV_MESSAGE.MAINSTREAM:
                const iconPct = (iconCounts[actor.icon] || 0) / total;
                const colorPct = (colorCounts[actor.color] || 0) / total;
                if (iconPct > 0.90 || colorPct > 0.90) points = 1; else points = -1;
                break;
        }

        actor.points += points;
    }

    return state;
}

