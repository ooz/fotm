import { MAP_PADDING } from "./config";
import { State } from "./state";
import { tvAreaSize } from "./tv";

export interface Actor {
    id: string,
    x: number,
    y: number,
    icon: string,
    color: string,
    points: number,
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

export function createPlayer(state: State): State {
    const [x, y] = getFreePosition(state)
    state.player = {
        id: "player",
        x: x,
        y: y,
        icon: "@",
        color: "#fff",
        points: 100,
    }
    return state
}

export function createActors(state: State): State {
    const positionToActorId = {}
    const actors = {}

    const availableMapSize = (state.width - MAP_PADDING) * (state.height - MAP_PADDING) - tvAreaSize() - 1
    const numberOfActorsToCreate = Math.floor(availableMapSize / 20)

    positionToActorId[`${""+state.player?.x},${""+state.player?.y}`] = state.player?.id;

    let actorId = 1;
    while (Object.keys(positionToActorId).length < numberOfActorsToCreate + 1) {
        let [x, y] = getFreePosition(state)
        if (!Object.hasOwn(positionToActorId, `${""+x},${""+y}`)) {
            positionToActorId[`${""+x},${""+y}`] = actorId.toString();
            actors[actorId.toString()] = {
                id: actorId.toString(),
                x: x,
                y: y,
                icon: "?",
                color: "#888",
                points: 100
            };
            actorId++;
        }
    }

    state.actors = actors;
    state.positionToActorId = positionToActorId;

    return state
}

export function act(state: State, actorId: string, action: string): State {
    switch (action) {
        case "N":
            state = entityInteractOrMove(state, actorId, 0, -1)
            break
        case "W":
            state = entityInteractOrMove(state, actorId, -1, 0)
            break
        case "S":
            state = entityInteractOrMove(state, actorId, 0, 1)
            break
        case "E":
            state = entityInteractOrMove(state, actorId, 1, 0)
            break
        default:
    }

    return state;
}

export function entityInteractOrMove(state: State, actorId: string, dx: number, dy: number): State {
    let actor: Actor = (actorId === "player") ? state.player : state.actors[actorId];

    const currentPositionKey = `${actor.x},${actor.y}`
    const targetX = actor.x + dx
    const targetY = actor.y + dy

    if (targetX <= 0 || targetX >= state.width - 1 || targetY <= 0 || targetY >= state.height - 1) {
        return state
    }

    const targetPositionKey = `${targetX},${targetY}`
    if (!Object.hasOwn(state.positionToActorId, targetPositionKey)) {
        delete state.positionToActorId[currentPositionKey]
        state.positionToActorId[targetPositionKey] = actor.id
        actor.x = targetX
        actor.y = targetY

        if (Object.hasOwn(state.positionToItem, targetPositionKey)) {
            const item = state.positionToItem[targetPositionKey]
            if (item) {
                if (item.icon === "") {
                    actor.color = item.color
                } else {
                    actor.icon = item.icon
                }
                state.positionToItem[targetPositionKey] = null
            }
        }
    }

    return state
}