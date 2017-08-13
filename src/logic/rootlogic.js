import GameLogic from './game/gamelogic'

export default class RootLogic {
    constructor() {
        this._gameLogic = new GameLogic();
    }

    // Get/set
    get gameLogic() { return this._gameLogic; }

    // Public slots
    slotOnAssetsLoadProgress(loader, resource) {
        console.log('Loading [' + resource.url + '] ' + loader.progress + '%');
    }

    slotOnAssetsLoadComplete() {
        this.signalStartGameNeeded(10, 22);
    }

    // Signals
    signalStartGameNeeded(fieldWidth, fieldHeight) {}
}
