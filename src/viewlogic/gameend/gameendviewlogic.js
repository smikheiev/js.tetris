import GameEndViewModel from './gameendviewmodel'

export default class GameEndViewLogic {
    constructor() {
        this._viewModel = new GameEndViewModel();
    }

    // Get/set
    get viewModel() { return this._viewModel; }

    // Signals
    signalBackToMainMenuNeeded() {}
}
