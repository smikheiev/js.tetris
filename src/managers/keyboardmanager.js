import KeyCode from '../const/keycode'

export default class KeyboardManage {
    constructor() {
        this._keysToHandle = [];

        window.addEventListener("keydown", this._keyDownHandler.bind(this));
    }

    // Public
    addKeysToHandle(keys) {
        keys.forEach(function(keyCode) {
            if (this._keysToHandle.indexOf(keyCode) < 0) {
                this._keysToHandle.push(keyCode);
            }
        }, this);
    }

    removeKeysToHandle(keys) {
        keys.forEach(function(keyCode) {
            let index = this._keysToHandle.indexOf(keyCode);
            if (index >= 0) {
                this._keysToHandle.splice(index, 1);
            }
        }, this);
    }

    // Private
    _keyDownHandler(e) {
        if (this._keysToHandle.indexOf(e.keyCode) >= 0) {
            this.signalKeyDown(e.keyCode);
        }
    }

    // Signals
    signalKeyDown(keyCode) {}
}
