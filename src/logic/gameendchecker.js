export default class GameEndChecker {
    constructor(fieldMatrix) {
        this._fieldMatrix = fieldMatrix;
        this._currentBlock = undefined;
    }

    // Get/set
    set currentBlock(value) { this._currentBlock = value; }

    // Public
    isGameEnded() {
        return this._isBlockOnFieldTop();
    }

    // Private
    _isBlockOnFieldTop() {
        if (this._currentBlock === undefined) {
            return false;
        }
        for (let blockY = 0; blockY < this._currentBlock.height; ++blockY) {
            for (let blockX = 0; blockX < this._currentBlock.width; ++blockX) {
                if (!this._currentBlock.isCellBusy(blockX, blockY)) {
                    continue;
                }

                let fieldY = this._currentBlock.fieldPositionY + blockY;
                if (fieldY <= 0) {
                    return true;
                }
            }
        }
        return false;
    }
}
