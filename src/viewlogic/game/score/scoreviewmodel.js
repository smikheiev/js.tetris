export default class ScoreViewModel {
    constructor() {
        this._score = 0;
    }

    // Get/set
    get score() { return this._score }
    set score(value) {
        if (this._score !== value) {
            this._score = value;
            this.signalScoreChanged();
        }
    }

    // Signals
    signalScoreChanged() {}
}
