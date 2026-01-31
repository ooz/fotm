import { act, createActors, createPlayer } from "./actor";
import { createItems } from "./item";
import { createMap } from "./map";
import { State, states_create } from "./state";
import { updateSystemsPerTurn } from "./systems";
import { createTV, GAME_OVER_MESSAGE, WIN_MESSAGE } from "./tv";

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
        this.state = createItems(this.state)

        return this.state
    }

    update(action: string): State {
        const playerId = "player"
        const playerExists = !!this.state.player; //!!this.state.entities[playerId]
        if (playerExists) {
            if (!!action) {
                this.state = act(this.state, playerId, action)
                if (this.state.tv?.messageStr !== WIN_MESSAGE && this.state.tv?.messageStr !== GAME_OVER_MESSAGE) {
                    this.state = updateSystemsPerTurn(this.state)
                }
            }
        }

        return this.state
    }

}
