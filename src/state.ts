import { ROT_OPTIONS } from "./config";
import { RNG } from "./rng";
import { TV } from "./tv";

export interface State {
    width: number,
    height: number,
    rng: RNG,
    tv: TV | null,
    points: number,
}

export function states_create(): State {
    return {
        width: ROT_OPTIONS.width,
        height: ROT_OPTIONS.height,
        rng: new RNG(),
        tv: null,
        points: 0
    }
}
