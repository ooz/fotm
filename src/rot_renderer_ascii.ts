import * as ROT from "../lib/rot.js"
import { FOTM_OPTIONS, ROT_OPTIONS } from "./config.js"
import { State } from "./state.js"

export const ROT_DISPLAY = new ROT.Display(ROT_OPTIONS)
document.body.appendChild(ROT_DISPLAY.getContainer())

export async function draw(state: State) {
    for (let y=0; y < ROT_OPTIONS.height; y++) {
        for (let x=0; x < ROT_OPTIONS.width; x++) {
            ROT_DISPLAY.drawText(x,  y, "#", "#0f0");
        }
    }
}

export async function resize() {
    ROT_DISPLAY._backend.setOptions(ROT_OPTIONS) // Trigger tile-gl backend's _updateSize method
}

export function updateDisplayOptions(windowWidth: number, windowHeight: number) {
    FOTM_OPTIONS.cameraWidth = Math.floor(windowWidth / FOTM_OPTIONS.fontSize)
    FOTM_OPTIONS.cameraHeight = Math.floor(windowHeight / FOTM_OPTIONS.fontSize)
    ROT_OPTIONS.width = Math.floor(FOTM_OPTIONS.cameraWidth * (1 / FOTM_OPTIONS.zoom))
    ROT_OPTIONS.height = Math.floor(FOTM_OPTIONS.cameraHeight * (1 / FOTM_OPTIONS.zoom))
}