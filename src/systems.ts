import { ItemType, itemTypeToItem } from "./item";
import { State } from "./state";
import { messageToString, TV_MESSAGE } from "./tv";

export function updateSystemsPerTurn(state: State): State {
    state = updateTvMessage(state)
    state = updateItems(state)

    return state;
}

let tvUpdateCounter = 0
function updateTvMessage(state: State): State {
    if (tvUpdateCounter <= 0 && state.tv) {
        const theme = state.rng.getItem([TV_MESSAGE.EDGY, TV_MESSAGE.MAINSTREAM, TV_MESSAGE.EMOJIS, TV_MESSAGE.LETTER, TV_MESSAGE.NUMBER, TV_MESSAGE.SYMBOL, TV_MESSAGE.LOVE, TV_MESSAGE.NATURE, TV_MESSAGE.NUCLEAR])

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

