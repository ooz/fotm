import { MAP_PADDING } from "./config"
import { RNG } from "./rng"
import { State } from "./state"

const TV_SCREEN_WIDTH = 12
const TV_SCREEN_HEIGHT = 8
const TV_BORDER = 1

export interface TV {
    x: number,
    y: number,
    width: number,
    height: number,
    message: string
}

export function createTV(state: State): State {
    const tvWidth = TV_SCREEN_WIDTH + TV_BORDER;
    const tvHeight = TV_SCREEN_HEIGHT + TV_BORDER;

    state.tv = {
        x: MAP_PADDING + state.rng.getUniform() * (state.width - 2 * MAP_PADDING - tvWidth),
        y: MAP_PADDING + state.rng.getUniform() * (state.height - 2 * MAP_PADDING - tvHeight),
        width: tvWidth,
        height: tvHeight,
        message: ""
    }

    return state
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
    SYMBOL
}
