import MainMenuModel from './mainmenumodel'

export default class MainMenuLogic {
    constructor() {
        this._model = new MainMenuModel();
    }

    // Get/set
    get model() { return this._model; }

    // Signals
    signalStartGameNeeded(fieldWidth, fieldHeight) {}
}
