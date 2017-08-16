import ScoreViewModel from './scoreviewmodel'

export default class ScoreViewLogic {
    constructor() {
        this._viewModel = new ScoreViewModel();
    }

    // Get/set
    get viewModel() { return this._viewModel; }

    // Public slots
    slotOnScoreChanged(score) {
        this._viewModel.score = score;
    }

    slotOnStartGameNeeded() {
        this._viewModel.score = 0;
    }
}
