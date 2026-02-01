import { MAP_PADDING } from "./config";
import { EMOJIS, ITEM_COLORS, LETTERS, NUMBERS, SYMBOLS } from "./constants";
import { State } from "./state";

export interface Item {
    icon: string,
    color: string,
    type: ItemType,
}

export enum ItemType {
    UNKNOWN,
    EMOJI,
    LETTER,
    NUMBER,
    SYMBOL,
    COLOR
}

export function createItems(state: State): State {

    // Top & bottom bars
    for (let x = MAP_PADDING; x < state.width - MAP_PADDING; x++) {
        const positionKey = `${x},1`
        state.positionToItem[positionKey] = {
            icon: "?",
            color: "#fff",
            type: ItemType.UNKNOWN
        }

        const positionKeyBot = `${x},${state.height - 2}`
        state.positionToItem[positionKeyBot] = {
            icon: "?",
            color: "#fff",
            type: ItemType.UNKNOWN
        }
    }

    // Left & right bars
    for (let y = MAP_PADDING; y < state.height - MAP_PADDING; y++) {
        const positionKey = `1,${y}`
        state.positionToItem[positionKey] = {
            icon: "?",
            color: "#fff",
            type: ItemType.UNKNOWN
        }

        const positionKeyRight = `${state.width - 2},${y}`
        state.positionToItem[positionKeyRight] = {
            icon: "?",
            color: "#fff",
            type: ItemType.UNKNOWN
        }
    }

    return state;
}

export function itemTypeToItem(state: State, type: ItemType): Item {
    switch (type) {
        case ItemType.EMOJI:
            return {
                icon: state.rng.getItem(EMOJIS),
                color: "#fff",
                type: ItemType.EMOJI
            }
        case ItemType.LETTER:
            return {
                icon: state.rng.getItem(LETTERS),
                color: "#fff",
                type: ItemType.LETTER
            }
        case ItemType.NUMBER:
            return {
                icon: state.rng.getItem(NUMBERS),
                color: "#fff",
                type: ItemType.NUMBER
            }
        case ItemType.SYMBOL:
            return {
                icon: state.rng.getItem(SYMBOLS),
                color: "#fff",
                type: ItemType.SYMBOL
            }
        case ItemType.COLOR:
            return {
                icon: "",
                color: state.rng.getItem(ITEM_COLORS),
                type: ItemType.COLOR
            }
        default:
            return {
                icon: "?",
                color: "#fff",
                type: ItemType.UNKNOWN
            }
    }
}