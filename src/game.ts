import { State, states_create } from "./state";

export default class Game {
    state: State;

    constructor() {
    }

    init(): State {
        this.state = states_create()

        return this.state
    }

    update(action: string): State {
        return this.state
    }

}
