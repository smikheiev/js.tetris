import MainMenuViewModel from './mainmenuviewmodel'

export default class MainMenuViewLogic {
    constructor() {
        this._viewModel = new MainMenuViewModel();
    }

    // Get/set
    get viewModel() { return this._viewModel; }

    // Signals
    signalStartGameNeeded(fieldWidth, fieldHeight) {}
}
