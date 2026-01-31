import { MAP_PADDING } from "./config";
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
                icon: state.rng.getItem(["🫠", "👾", "🤘", "🥷", "🦉", "🐸", "🐢", "🌲", "🍩", "🚀", "🥋", "🎭", "💰", "☢️", "❤️"]),
                color: "#fff",
                type: ItemType.EMOJI
            }
        case ItemType.LETTER:
            return {
                icon: state.rng.getItem(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]),
                color: "#fff",
                type: ItemType.LETTER
            }
        case ItemType.NUMBER:
            return {
                icon: state.rng.getItem(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]),
                color: "#fff",
                type: ItemType.NUMBER
            }
        case ItemType.SYMBOL:
            return {
                icon: state.rng.getItem(["!", "#", "$", "%", "="]),
                color: "#fff",
                type: ItemType.SYMBOL
            }
        case ItemType.COLOR:
            return {
                icon: "",
                color: state.rng.getItem(["#fff", "#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff"]),
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