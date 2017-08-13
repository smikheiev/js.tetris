import * as PIXI from 'pixi.js'

export default class TickManager {
    constructor() {
        PIXI.ticker.shared.add(this._onTickerTick, this);
    }

    // Private
    _onTickerTick() {
        this.signalTick(PIXI.ticker.shared.elapsedMS);
    }

    // Signals
    signalTick(elapsedMs) {}
}
