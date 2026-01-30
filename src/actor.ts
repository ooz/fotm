import { State } from "./state";

export interface Actor {
    x: number,
    y: number,
    icon: string,
    color: string
}

export function createPlayer(state: State): State {
    return state
}

export function createActors(state: State): State {
    return state
}