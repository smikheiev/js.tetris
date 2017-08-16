export default class ScoreCounter {
    constructor(scorePerCell = 10) {
        this._scorePerCell = scorePerCell;

        this._currentScore = 0;
        this._currentCombo = 0;
    }

    // Get/set
    get currentScore() { return this._currentScore; }

    // Public
    rowWillBeRemoved() {
        this._currentCombo += 1;
    }

    cellRemoved() {
        this._currentScore += this._scorePerCell * this._currentCombo;
    }

    roundEnded() {
        this._currentCombo = 0;
    }
}
