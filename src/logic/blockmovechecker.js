// TODO: implement moving on more than 1 cell?
class BlockMoveChecker {
    constructor(fieldMatrix) {
        this._fieldMatrix = fieldMatrix;
        this._currentBlock = undefined;
    }

    // Get/set
    set currentBlock(value) { this._currentBlock = value; }

    // Public
    canMoveLeft() {
        this._currentBlock.fieldPositionX -= 1;
        let canMove = (this._getMinBusyBlockCellX() >= 0) && !this._isAnyBlockCellOverLockedCell();
        this._currentBlock.fieldPositionX += 1;

        return new MoveData(canMove, -1, 0);
    }

    canMoveRight() {
        this._currentBlock.fieldPositionX += 1;
        let canMove = (this._getMaxBusyBlockCellX() < this._fieldMatrix.width) && !this._isAnyBlockCellOverLockedCell();
        this._currentBlock.fieldPositionX -= 1;

        return new MoveData(canMove, 1, 0);
    }

    canMoveUp() {
        this._currentBlock.fieldPositionY -= 1;
        let canMove = (this._getMinBusyBlockCellY() >= 0) && !this._isAnyBlockCellOverLockedCell();
        this._currentBlock.fieldPositionY += 1;

        return new MoveData(canMove, 0, -1);
    }

    canMoveDown() {
        this._currentBlock.fieldPositionY += 1;
        let canMove = (this._getMaxBusyBlockCellY() < this._fieldMatrix.height) && !this._isAnyBlockCellOverLockedCell();
        this._currentBlock.fieldPositionY -= 1;

        return new MoveData(canMove, 0, 1);
    }

    canRotate() {
        if (this._currentBlock === undefined) {
            return new MoveData(false);
        }

        this._currentBlock.rotate();

        let canRotate = (this._getMaxBusyBlockCellY() < this._fieldMatrix.height);
        if (!canRotate) {
            this._currentBlock.rotateBack();
            return new MoveData(false);
        }

        let xOffset = 0;
        let minBlockX = this._getMinBusyBlockCellX();
        if (minBlockX < 0) {
            xOffset = -minBlockX;
        } else {
            let maxBlockX = this._getMaxBusyBlockCellX();
            if (maxBlockX >= this._fieldMatrix.width) {
                xOffset = this._fieldMatrix.width - maxBlockX - 1;
            }
        }
        this._currentBlock.fieldPositionX += xOffset;

        canRotate = !this._isAnyBlockCellOverLockedCell();

        this._currentBlock.fieldPositionX -= xOffset;
        this._currentBlock.rotateBack();

        return new MoveData(canRotate, xOffset, 0);
    }

    // Private
    _getMinBusyBlockCellX() {
        let minX = Number.MAX_SAFE_INTEGER;
        for (let blockY = 0; blockY < this._currentBlock.height; ++blockY) {
            for (let blockX = 0; blockX < this._currentBlock.width; ++blockX) {
                if (!this._currentBlock.isCellBusy(blockX, blockY)) {
                    continue;
                }

                let fieldX = this._currentBlock.fieldPositionX + blockX;
                minX = Math.min(minX, fieldX);

                break;
            }
        }
        return minX;
    }

    _getMaxBusyBlockCellX() {
        let maxX = Number.MIN_SAFE_INTEGER;
        for (let blockY = 0; blockY < this._currentBlock.height; ++blockY) {
            for (let blockX = this._currentBlock.width - 1; blockX >= 0; --blockX) {
                if (!this._currentBlock.isCellBusy(blockX, blockY)) {
                    continue;
                }

                let fieldX = this._currentBlock.fieldPositionX + blockX;
                maxX = Math.max(maxX, fieldX);

                break;
            }
        }
        return maxX;
    }

    _getMinBusyBlockCellY() {
        let minY = Number.MAX_SAFE_INTEGER;

        for (let blockX = 0; blockX < this._currentBlock.width; ++blockX) {
            for (let blockY = 0; blockY < this._currentBlock.height; ++blockY) {
                if (!this._currentBlock.isCellBusy(blockX, blockY)) {
                    continue;
                }

                let fieldY = this._currentBlock.fieldPositionY + blockY;

                minY = Math.min(minY, fieldY);

                break;
            }
        }
        return minY;
    }

    _getMaxBusyBlockCellY() {
        let maxY = Number.MIN_SAFE_INTEGER

        for (let blockX = 0; blockX < this._currentBlock.width; ++blockX) {
            for (let blockY = this._currentBlock.height - 1; blockY >= 0; --blockY) {
                if (!this._currentBlock.isCellBusy(blockX, blockY)) {
                    continue;
                }

                let fieldY = this._currentBlock.fieldPositionY + blockY;

                maxY = Math.max(maxY, fieldY);

                break;
            }
        }
        return maxY;
    }

    _isAnyBlockCellOverLockedCell() {
        for (let blockX = 0; blockX < this._currentBlock.width; ++blockX) {
            for (let blockY = 0; blockY < this._currentBlock.height; ++blockY) {
                if (!this._currentBlock.isCellBusy(blockX, blockY)) {
                    continue;
                }

                let fieldX = this._currentBlock.fieldPositionX + blockX;
                let fieldY = this._currentBlock.fieldPositionY + blockY;
                if (this._fieldMatrix.isCellBusy(fieldX, fieldY)) {
                    return true;
                }
            }
        }
        return false;
    }
}

class MoveData {
    constructor(canMove, xOffset = 0, yOffset = 0) {
        this._canMove = canMove;
        this._xOffset = xOffset;
        this._yOffset = yOffset;
    }

    // Get/set
    get canMove() { return this._canMove; }
    get xOffset() { return this._xOffset; }
    get yOffset() { return this._yOffset; }
}

export { BlockMoveChecker, MoveData };
