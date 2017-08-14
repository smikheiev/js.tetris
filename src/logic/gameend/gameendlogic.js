import GameEndModel from './gameendmodel'

export default class GameEndLogic {
    constructor() {
        this._model = new GameEndModel();
    }

    // Get/set
    get model() { return this._model; }

    // Signals
    signalBackToMainMenuNeeded() {}
}
