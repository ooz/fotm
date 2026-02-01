import { MAP_PADDING } from "./config";
import { State } from "./state";

export function createMap(state: State): State {
    return state
}

export function getFreePosition(state: State): Array<number> {
    let x = 0;
    let y = 0;
    let tries = 0;
    const maxTries = 1000;

    do {
        x = Math.floor(MAP_PADDING + state.rng.getUniform() * (state.width - 2 * MAP_PADDING));
        y = Math.floor(MAP_PADDING + state.rng.getUniform() * (state.height - 2 * MAP_PADDING));
        tries++;
    } while (state.tv && (
        x >= state.tv.x &&
        x < state.tv.x + state.tv.width &&
        y >= state.tv.y &&
        y < state.tv.y + state.tv.height
    ) && tries < maxTries);

    if (x !== 0 && y !== 0) {
        return [ x, y ];
    }

    return [4, 4];
}