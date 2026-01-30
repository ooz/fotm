const WINDOW_WIDTH_IN_PX = (typeof window !== 'undefined') ? window.innerWidth : 0
const WINDOW_HEIGHT_IN_PX = (typeof window !== 'undefined') ? window.innerHeight : 0

const FONT_SIZE = 16
export enum ShowEnergyIndicators {
    NONE,
    BARS,
    NUMBERS
}
export const FOTM_OPTIONS = {
    cameraWidth: Math.floor(WINDOW_WIDTH_IN_PX / FONT_SIZE),
    cameraHeight: Math.floor(WINDOW_HEIGHT_IN_PX / FONT_SIZE),
    chatLogMaxSize: 100,
    chatLogMaxDisplaySize: 8, // 10
    debug: true,
    fontSize: FONT_SIZE,
    highlightFriendEnemy: true,
    showUI: true,
    showTooltip: true,
    showEnergy: ShowEnergyIndicators.BARS,
    uiEffectsMaxDisplaySize: 8,
    zoom: 1
}

export const ROT_OPTIONS = {
	width: Math.floor(BOTMOS_OPTIONS.cameraWidth * (1 / BOTMOS_OPTIONS.zoom)),
    height: Math.floor(BOTMOS_OPTIONS.cameraHeight * (1 / BOTMOS_OPTIONS.zoom)),
    bg: 'transparent',
    fontSize: Math.floor(BOTMOS_OPTIONS.fontSize * BOTMOS_OPTIONS.zoom),
    //fontStyle: 'bold',
    forceSquareRatio: true
}