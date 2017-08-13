import AssetsManager from './assetsmanager'
import TickManager from './tickmanager'

export default class RootManager {
    constructor() {
        this._assetsManager = new AssetsManager();
        this._tickManager = new TickManager();
    }

    // Get/set
    get assetsManager() { return this._assetsManager; }
    get tickManager() { return this._tickManager; }
}
