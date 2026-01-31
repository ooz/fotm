import { MAP_PADDING } from "./config";
import { State } from "./state";
import { tvAreaSize } from "./tv";

export interface Actor {
    id: string,
    x: number,
    y: number,
    icon: string,
    color: string
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
        x < state.tv.x &&
        x >= state.tv.x + state.tv.width &&
        y < state.tv.y &&
        y >= state.tv.y + state.tv.height
    ) && tries < maxTries);

    if (x !== 0 && y !== 0) {
        return [ x, y ];
    }

    return [4, 4];
}

export function createPlayer(state: State): State {
    const [x, y] = getFreePosition(state)
    state.player = {
        id: "player",
        x: x,
        y: y,
        icon: "@",
        color: "#fff"
    }
    return state
}

export function createActors(state: State): State {
    const positionToActorId = {}
    const actors = {}

    const availableMapSize = (state.width - MAP_PADDING) * (state.height - MAP_PADDING) - tvAreaSize() - 1
    const numberOfActorsToCreate = Math.floor(availableMapSize / 10)
    console.log(`Spawning ${numberOfActorsToCreate} actors.`)

    positionToActorId[`${""+state.player?.x},${""+state.player?.y}`] = state.player?.id;

    let actorId = 1;
    while (Object.keys(positionToActorId).length < numberOfActorsToCreate + 1) {
        let [x, y] = getFreePosition(state)
        if (!Object.hasOwn(positionToActorId, `${""+x},${""+y}`)) {
            console.log("Creating actor " + actorId)
            positionToActorId[`${""+x},${""+y}`] = actorId.toString();
            actors[actorId.toString()] = {
                id: actorId.toString(),
                x: x,
                y: y,
                icon: "A",
                color: "#f00"
            };
            actorId++;
        }
    }

    state.actors = actors;
    state.positionToActorId = positionToActorId;

    return state
}