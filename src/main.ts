import { initializeEvents } from "./event_manager.js";
import Game from "./game.js";

const game = new Game();
initializeEvents(game);