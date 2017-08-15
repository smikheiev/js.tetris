import FieldViewLogic from './field/fieldviewlogic'
import GameLogic from '../../logic/gamelogic'
import KeyCode from '../../const/keycode'

export default class GameViewLogic {
    constructor() {
        this._fieldViewLogic = new FieldViewLogic();
        this._waitTimer = 0;
        this._isGameStarted = false;
        this._gameLogic = undefined;
    }

    // Get/set
    get fieldViewLogic() { return this._fieldViewLogic; }

    // Public slots
    slotOnTick(deltaTime) {
        if (!this._isGameStarted) {
            return;
        }

        this._waitTimer -= deltaTime;
        if (this._waitTimer <= 0) {
            this._gameLogic.tryMoveDown();
            this._waitTimer = 1000;
        }
    }

    slotOnKeyDown(keyCode) {
        if (!this._isGameStarted) {
            return;
        }

        switch (keyCode) {
            case KeyCode.KEY_LEFT:
                this._gameLogic.tryMoveLeft();
                break;
            case KeyCode.KEY_RIGHT:
                this._gameLogic.tryMoveRight();
                break;
            case KeyCode.KEY_UP:
                this._gameLogic.tryRotate();
                break;
            case KeyCode.KEY_DOWN:
                this._gameLogic.tryMoveDown();
                break;
        }
    }

    slotOnStartGameNeeded(fieldWidth, fieldHeight) {
        this._gameLogic = new GameLogic(fieldWidth, fieldHeight, this);

        this._isGameStarted = true;
        this._waitTimer = 1000;
        this._fieldViewLogic.startGame(fieldWidth, fieldHeight);
    }

    // Logic callbacks
    callbackSetCellValue(x, y, value) {
        this.fieldViewLogic.setCellValue(x, y, value);
    }

    callbackClearCellValue(x, y) {
        this.fieldViewLogic.clearCellValue(x, y);
    }

    callbackRemoveCell(x, y) {
        this.fieldViewLogic.removeCell(x, y);
    }

    callbackGameEnded() {
        this._isGameStarted = false;
        this.signalGameEnded();
    }

    // Signals
    signalGameEnded() {}
}
