import KeyboardManager from './keyboardmanager'
import AssetsManager from './assetsmanager'
import TickManager from './tickmanager'

export default class RootManager {
    constructor() {
        this._keyboardManager = new KeyboardManager();
        this._assetsManager = new AssetsManager();
        this._tickManager = new TickManager();
    }

    // Get/set
    get keyboardManager() { return this._keyboardManager; }
    get assetsManager() { return this._assetsManager; }
    get tickManager() { return this._tickManager; }
}
