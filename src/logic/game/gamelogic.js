import FieldLogic from './field/fieldlogic'

export default class GameLogic {
    constructor() {
        this._fieldLogic = new FieldLogic();
        this._waitTimer = 0;
        this._isGameStarted = false;
    }

    // Get/set
    get fieldLogic() { return this._fieldLogic; }

    // Public slots
    slotOnTick(deltaTime) {
        if (!this._isGameStarted) {
            return;
        }

        this._waitTimer -= deltaTime;
        if (this._waitTimer <= 0) {
            this._fieldLogic.moveDown();
            this._waitTimer = 1000;
        }
    }

    slotOnStartGameNeeded(fieldWidth, fieldHeight) {
        this._isGameStarted = true;
        this._waitTimer = 1000;
        this._fieldLogic.startGame(fieldWidth, fieldHeight);
    }

    slotOnBlockLockedOnFieldTop() {
        this._isGameStarted = false;
        this.signalGameEnded();
    }

    // Signals
    signalGameEnded() {}
}
