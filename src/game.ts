import { act, createActors, createPlayer } from "./actor";
import { createMap } from "./map";
import { State, states_create } from "./state";
import { createTV } from "./tv";

export default class Game {
    state: State;

    constructor() {
    }

    init(): State {
        this.state = states_create()

        this.state = createMap(this.state)
        this.state = createTV(this.state)
        this.state = createPlayer(this.state)
        this.state = createActors(this.state)

        return this.state
    }

    update(action: string): State {
        const playerId = "player"
        const playerExists = true; //!!this.state.entities[playerId]
        if (playerExists) {
            if (!!action) {
                this.state = act(this.state, playerId, action)
            }
        }

        return this.state
    }

}
