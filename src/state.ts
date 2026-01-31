import { Actor } from "./actor";
import { ROT_OPTIONS } from "./config";
import { Item } from "./item";
import { RNG } from "./rng";
import { TV } from "./tv";

export interface State {
    width: number,
    height: number,
    rng: RNG,
    tv: TV | null,
    player: Actor | null,
    actors: { [actorId: string]: Actor },
    positionToActorId: { [positionKey: string]: string },
    positionToItem: { [positionKey: string]: Item | null },
}

export function states_create(): State {
    return {
        width: ROT_OPTIONS.width,
        height: ROT_OPTIONS.height,
        rng: new RNG(),
        tv: null,
        player: null,
        actors: {},
        positionToActorId: {},
        positionToItem: {},
    }
}
