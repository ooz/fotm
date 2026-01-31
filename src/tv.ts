import { MAP_PADDING } from "./config"
import { RNG } from "./rng"
import { State } from "./state"

const TV_SCREEN_WIDTH = 12
const TV_SCREEN_HEIGHT = 8
const TV_BORDER = 1

const DEFAULT_MESSAGE = "FotM! Press any key to start!"
export const GAME_OVER_MESSAGE = "GAME OVER!"
export const WIN_MESSAGE = "YOU WIN!"

export interface TV {
    x: number,
    y: number,
    width: number,
    height: number,
    message: TV_MESSAGE | null,
    messageStr: string
}

export function createTV(state: State): State {
    const tvWidth = TV_SCREEN_WIDTH + TV_BORDER;
    const tvHeight = TV_SCREEN_HEIGHT + TV_BORDER;

    state.tv = {
        x: MAP_PADDING + state.rng.getUniform() * (state.width - 2 * MAP_PADDING - tvWidth),
        y: MAP_PADDING + state.rng.getUniform() * (state.height - 2 * MAP_PADDING - tvHeight),
        width: tvWidth,
        height: tvHeight,
        message: null,
        messageStr: DEFAULT_MESSAGE
    }

    return state
}

export function tvAreaSize(): number {
    return (TV_SCREEN_WIDTH + TV_BORDER) * (TV_SCREEN_HEIGHT + TV_BORDER)
}

export enum TV_MESSAGE {
    EDGY,
    MAINSTREAM,
    EMOJIS,
    NUCLEAR,
    NATURE,
    LOVE,
    NUMBER,
    LETTER,
    SYMBOL,
    COLOR
}

export function messageToString(state: State, msg: TV_MESSAGE): string {
    switch (msg) {
        case TV_MESSAGE.EDGY:
            return state.rng.getItem(["Be edgy!", "Be yourself", "Be hip!"])
        case TV_MESSAGE.MAINSTREAM:
            return state.rng.getItem(["Fade in the mainstream!", "Strength in unity!"])
        case TV_MESSAGE.EMOJIS:
            return state.rng.getItem(["FotM are emojis!", "We ❤️ emojis!"])
        case TV_MESSAGE.NUCLEAR:
            return state.rng.getItem(["FotM is nuclear!"])
        case TV_MESSAGE.NATURE:
            return state.rng.getItem(["FotM is nature!"])
        case TV_MESSAGE.LOVE:
            return state.rng.getItem(["FotM is love!"])
        case TV_MESSAGE.NUMBER:
            return state.rng.getItem(["FotM is number!"])
        case TV_MESSAGE.LETTER:
            return state.rng.getItem(["FotM is letter!"])
        case TV_MESSAGE.SYMBOL:
            return state.rng.getItem(["FotM is symbol!"])
        case TV_MESSAGE.COLOR:
            return state.rng.getItem(["FotM is color!", "Show your true colors"])
        default:
            return DEFAULT_MESSAGE
    }
}
