import Game from "./game";
import { onKeyDown, } from "./input";
import { draw, resize, updateDisplayOptions } from "./rot_renderer_ascii";

export function initializeEvents(game: Game) {
    window.onload = function() {
        draw(game.init())
    }

    window.onresize = async function() {
        const WINDOW_WIDTH_IN_PX = (typeof window !== 'undefined') ? window.innerWidth : 0
        const WINDOW_HEIGHT_IN_PX = (typeof window !== 'undefined') ? window.innerHeight : 0

        updateDisplayOptions(WINDOW_WIDTH_IN_PX, WINDOW_HEIGHT_IN_PX)
        await resize()
        draw(game.init())
    }

    onKeyDown(function(action) {
        draw(game.update(action));
    })
    /*

    onMouseMove(drawTooltip)
    */

    document.body.focus(); // focus on the canvas
}
