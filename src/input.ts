/**
 * All keys ever supported:
 * - Arrow keys:    Movement, 4 directional, diagonal movement is 2 turns and translated for convenience
 * - 4 buttons:     A/X: positive continue action, B/Y/Z: negative non-continue action, 1 and 2 quick slots
 * - 2 shoulder buttons: redundancy
 * - ESC / START / menu key:    Open game menu
 */
const _BM_INPUT = {
    up: false,
    right: false,
    down: false,
    left: false,
    a: false,
    b: false,
    one: false,
    two: false,
    menu: false,
    slash: false
}

let _inputQueue: string[] = []
let _keyDownCallback = undefined
let _mouseOverCallback = undefined
let _timeOfLastActionInMs: number = 0

/**
 * Keyboard controls
 */
document.body.addEventListener("keydown", function(e) {
    if (e.defaultPrevented) {
        return; // Do nothing if event already handled
    }

    let key = e.key;
    switch (key) {
        case 'w':
        case 'ArrowUp':
            _BM_INPUT.up = true;
            _preventDefaultAndStopPropagation(e)
            break
        case 'a':
        case 'ArrowLeft':
            _BM_INPUT.left = true;
            _preventDefaultAndStopPropagation(e);
            break;
        case 's':
        case 'ArrowDown':
            _BM_INPUT.down = true;
            _preventDefaultAndStopPropagation(e);
            break;
        case 'd':
        case 'ArrowRight':
            _BM_INPUT.right = true;
            _preventDefaultAndStopPropagation(e);
            break;
        case 'x':
            _BM_INPUT.a = true;
            _preventDefaultAndStopPropagation(e);
            break;
        case ' ':
        case 'y':
        case 'z':
            _BM_INPUT.b = true;
            _preventDefaultAndStopPropagation(e);
            break;
        case 'm':
            _BM_INPUT.menu = true;
            _preventDefaultAndStopPropagation(e);
            break;
        case '#':
        case '/':
            _BM_INPUT.slash = true;
            _preventDefaultAndStopPropagation(e);
            break;
        default:
    }

    _triggerCallback(_get_action())
})

function _triggerCallback(command: string) {
    const currentTimeInMs = Date.now();
    if (_keyDownCallback !== undefined && currentTimeInMs - _timeOfLastActionInMs >= 80) {
        _timeOfLastActionInMs = currentTimeInMs
        _keyDownCallback(command)
    }
}

document.body.addEventListener("keyup", function(e) {
    if (e.defaultPrevented) {
        return; // Do nothing if event already handled
    }

    let key = e.key;
    switch (key) {
        case 'w':
        case 'ArrowUp':
            _BM_INPUT.up = false;
            _preventDefaultAndStopPropagation(e);
            break;
        case 'a':
        case 'ArrowLeft':
            _BM_INPUT.left = false;
            _preventDefaultAndStopPropagation(e);
            break;
        case 's':
        case 'ArrowDown':
            _BM_INPUT.down = false;
            _preventDefaultAndStopPropagation(e);
            break;
        case 'd':
        case 'ArrowRight':
            _BM_INPUT.right = false;
            _preventDefaultAndStopPropagation(e);
            break;
        case 'x':
            _BM_INPUT.a = false;
            _preventDefaultAndStopPropagation(e);
            break;
        case ' ':
        case 'y':
        case 'z':
            _BM_INPUT.b = false;
            _preventDefaultAndStopPropagation(e);
            break;
        case 'm':
            _BM_INPUT.menu = false;
            _preventDefaultAndStopPropagation(e);
            break;
        case '#':
        case '/':
            _BM_INPUT.slash = false;
            _preventDefaultAndStopPropagation(e);
        default:
    }
})

/**
 * Mouse/touch controls
 */
document.body.addEventListener("click", function(e) {
    const x = e.clientX;
    const y = e.clientY;
    const width = document.body.clientWidth;
    const widthThird = width / 3;
    const height = document.body.clientHeight;
    const heightThird = height / 3;

    if (x >= widthThird && x < 2 * widthThird && y < heightThird) {
        _triggerCallback(MANIFEST.commands.N)
        _preventDefaultAndStopPropagation(e);

    } else if (x < widthThird && y < heightThird) {
        _triggerCallback(MANIFEST.commands.B)
        _preventDefaultAndStopPropagation(e);

    } else if (x >= 2 * widthThird && y < heightThird) {
        _triggerCallback(MANIFEST.commands.A)
        _preventDefaultAndStopPropagation(e);

    } else if (x < widthThird && y >= heightThird && y < 2 * heightThird) {
        _triggerCallback(MANIFEST.commands.W)
        _preventDefaultAndStopPropagation(e);

    } else if (x >= 2 * widthThird && y >= heightThird && y < 2 * heightThird) {
        _triggerCallback(MANIFEST.commands.E)
        _preventDefaultAndStopPropagation(e);

    } else if (x >= widthThird && x < 2 * widthThird && y >= 2 * heightThird) {
        _triggerCallback(MANIFEST.commands.S)
        _preventDefaultAndStopPropagation(e);

    } else if (x >= widthThird && x < 2 * widthThird && y >= heightThird && y < 2 * heightThird) {
        _triggerCallback(MANIFEST.commands.M)
        _preventDefaultAndStopPropagation(e);
    }
});

function _preventDefaultAndStopPropagation(e) {
    e.preventDefault();
    e.stopPropagation();
}

let _lastAction: string | null = null;
function _updateInputQueue() {
    let action: string | null = null;

    if (_BM_INPUT.right) {
        action = "E";
    }
    if (_BM_INPUT.left) {
        action = "W";
    }
    if (_BM_INPUT.down) {
        action = "S";
    }
    if (_BM_INPUT.up) {
        action = "N";
    }

    if (_BM_INPUT.up && _BM_INPUT.right) {
        if (action === "N" && _lastAction === "N") {
            action = "E";
        }
    }
    if (_BM_INPUT.up && _BM_INPUT.left) {
        if (action === "N" && _lastAction === "N") {
            action = "W";
        }
    }
    if (_BM_INPUT.down && _BM_INPUT.right) {
        if (action === "S" && _lastAction === "S") {
            action = "E";
        }
    }
    if (_BM_INPUT.down && _BM_INPUT.left) {
        if (action === "S" && _lastAction === "S") {
            action = "W";
        }
    }

    if (_BM_INPUT.a) {
        action = "A"
    }

    if (_BM_INPUT.b) {
        action = "B";
    }

    if (_BM_INPUT.menu) {
        action = "M";
    }
    if (_BM_INPUT.slash) {
        action = "#";
    }

    _lastAction = action;
    if (action !== null) {
        _inputQueue.push(action);
    }
}

function _get_action(): string | null {
    _updateInputQueue();
    let action = _inputQueue.shift() || null;
    _inputQueue = [];
    return action;
}

document.body.addEventListener("mousemove", function(e) {
    if (e.defaultPrevented) {
        return; // Do nothing if event already handled
    }

    if (_keyDownCallback !== undefined) {
        _mouseOverCallback(e)
        _preventDefaultAndStopPropagation(e)
    }
})

/**
 * Gamepad controls
 *
 * On Xbox/Playstation controllers, see https://gabrielromualdo.com/articles/2020-12-15-how-to-use-the-html5-gamepad-api
 *
 * Index | Button
 * 0       A/X
 * 1       B/O
 * 2       X/Square
 * 3       Y/Triangle
 * 9       Show Menu
 * 12      Up
 * 13      Down
 * 14      Left
 * 15      Right
 */
let _gamepadPollingInterval = undefined
window.addEventListener("gamepadconnected", (e) => {
    /*
    console.log(
        "Gamepad connected at index %d: %s. %d buttons, %d axes",
        e.gamepad?.index,
        e.gamepad?.id,
        e.gamepad?.buttons.length,
        e.gamepad?.axes.length,
    );
    console.log(navigator.getGamepads()[e.gamepad?.index])
    */

    _gamepadPollingInterval = setInterval(function(){
        let gamepad = navigator.getGamepads()[e.gamepad?.index];

        _BM_INPUT.right = gamepad.buttons[15].pressed
        _BM_INPUT.left = gamepad.buttons[14].pressed
        _BM_INPUT.down = gamepad.buttons[13].pressed
        _BM_INPUT.up = gamepad.buttons[12].pressed
        _BM_INPUT.a = gamepad.buttons[0].pressed || gamepad.buttons[2].pressed
        _BM_INPUT.b = gamepad.buttons[1].pressed || gamepad.buttons[3].pressed
        _BM_INPUT.menu = gamepad.buttons[9].pressed

        if (_BM_INPUT.right || _BM_INPUT.left || _BM_INPUT.down || _BM_INPUT.up || _BM_INPUT.a || _BM_INPUT.b || _BM_INPUT.menu) {
            _triggerCallback(_get_action())
        }
      }, 100)
});

window.addEventListener("gamepaddisconnected", (e) => {
    /*
    console.log(
        "Gamepad disconnected from index %d: %s",
        e.gamepad?.index,
        e.gamepad?.id,
    );
    */
    clearInterval(_gamepadPollingInterval)
});

export function onKeyDown(callback: Function) {
    _keyDownCallback = callback
}

export function onMouseMove(callback: Function) {
    _mouseOverCallback = callback
}
