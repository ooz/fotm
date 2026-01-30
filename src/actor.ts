import { MAP_PADDING } from "./config";
import { State } from "./state";

export interface Actor {
    x: number,
    y: number,
    icon: string,
    color: string
}

export function getFreePosition(state: State): { x: number, y: number } {
    let x = 0;
    let y = 0;
    let tries = 0;
    const maxTries = 1000;

    do {
        x = Math.floor(MAP_PADDING + state.rng.getUniform() * (state.width - 2 * MAP_PADDING));
        y = Math.floor(MAP_PADDING + state.rng.getUniform() * (state.height - 2 * MAP_PADDING));
        tries++;
    } while (state.tv && (
        x < state.tv.x &&
        x >= state.tv.x + state.tv.width &&
        y < state.tv.y &&
        y >= state.tv.y + state.tv.height
    ) && tries < maxTries);

    return { x, y };
}

export function createPlayer(state: State): State {
    const {x, y} = getFreePosition(state)
    state.player = {
        x: x,
        y: y,
        icon: "@",
        color: "#fff"
    }
    return state
}

export function createActors(state: State): State {
    return state
}