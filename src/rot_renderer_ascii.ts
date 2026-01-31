import * as ROT from "../lib/rot.js"
import { FOTM_OPTIONS, ROT_OPTIONS } from "./config.js"
import { State } from "./state.js"
import { TV } from "./tv.js"

export const ROT_DISPLAY = new ROT.Display(ROT_OPTIONS)
document.body.appendChild(ROT_DISPLAY.getContainer())

export async function draw(state: State) {
    console.log(`Width: ${state.width}, height: ${state.height}`)
    ROT_DISPLAY.clear()
    for (let y=0; y < state.height; y++) {
        for (let x=0; x < state.width; x++) {
            if (x === 0 || y === 0 || x === state.width - 1 || y === state.height - 1) {
                ROT_DISPLAY.drawOver(x, y, "#", "#888", "#888")
            }
        }
    }

    if (state.tv) {
        drawTV(state.tv, ROT_DISPLAY)
    }

    if (state.player) {
        ROT_DISPLAY.drawOver(state.player.x, state.player.y, state.player.icon, state.player.color, null)
    }

    if (state.actors) {
        for (const actor of Object.values(state.actors) as any[]) {
            ROT_DISPLAY.drawOver(actor.x, actor.y, actor.icon, actor.color, null)
        }
    }

    // UI
    ROT_DISPLAY.drawText(0, 0, "%c{#ff0}%b{#888}" + state.points)
}

export async function resize() {
    ROT_DISPLAY.setOptions(ROT_OPTIONS) // Trigger tile-gl backend's _updateSize method
}

export function updateDisplayOptions(windowWidth: number, windowHeight: number) {
    FOTM_OPTIONS.cameraWidth = Math.floor(windowWidth / FOTM_OPTIONS.fontSize)
    FOTM_OPTIONS.cameraHeight = Math.floor(windowHeight / FOTM_OPTIONS.fontSize)
    ROT_OPTIONS.width = Math.floor(FOTM_OPTIONS.cameraWidth * (1 / FOTM_OPTIONS.zoom))
    ROT_OPTIONS.height = Math.floor(FOTM_OPTIONS.cameraHeight * (1 / FOTM_OPTIONS.zoom))
}

function drawTV(tv: TV, display: any) {
    for (let y=tv.y; y < tv.y + tv.height; y++) {
        for (let x=tv.x; x < tv.x + tv.width; x++) {
            if (x === tv.x || y === tv.y || x === tv.x + tv.width - 1 || y === tv.y + tv.height - 1) {
                display.drawOver(x,  y, "#", "#aaa", "#aaa");
            } else {
                display.drawOver(x,  y, "#", "#0f0", "#0f0");
            }
        }
    }

    if (tv.message) {
        display.drawText(tv.x + 1, tv.y + 3, "%c{#000}%b{#0f0}" + tv.message, 12)
    }
}