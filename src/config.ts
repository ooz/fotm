const WINDOW_WIDTH_IN_PX = (typeof window !== 'undefined') ? window.innerWidth : 0
const WINDOW_HEIGHT_IN_PX = (typeof window !== 'undefined') ? window.innerHeight : 0

const FONT_SIZE = 16

export const MAP_PADDING = 5

export const FOTM_OPTIONS = {
    cameraWidth: Math.floor(WINDOW_WIDTH_IN_PX / FONT_SIZE),
    cameraHeight: Math.floor(WINDOW_HEIGHT_IN_PX / FONT_SIZE),
    debug: true,
    fontSize: FONT_SIZE,
    zoom: 1
}

export const ROT_OPTIONS = {
	width: Math.floor(FOTM_OPTIONS.cameraWidth * (1 / FOTM_OPTIONS.zoom)),
    height: Math.floor(FOTM_OPTIONS.cameraHeight * (1 / FOTM_OPTIONS.zoom)),
    bg: 'transparent',
    fontSize: Math.floor(FOTM_OPTIONS.fontSize * FOTM_OPTIONS.zoom),
    //fontStyle: 'bold',
    forceSquareRatio: true
}