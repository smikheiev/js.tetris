import BlockRepository from './blocks/blocksrepository'
import BlockType from '../../../const/blocktype'
import FieldModel from './fieldmodel'

export default class FieldLogic {
    constructor() {
        this._model = new FieldModel();

        this._blockRepository = new BlockRepository();
        this._currentBlock = undefined;
        this._predefinedBlocks = [
            // BlockType.L, BlockType.J, BlockType.T, BlockType.O, BlockType.S, BlockType.Z, BlockType.I
        ]
    }

    // Get/set
    get model() { return this._model; }

    // Public
    startGame(width, height) {
        this._model.setSize(width, height);

        this._generateNewBlock();
        this._updateFieldForCurrentBlock(false);

        window.addEventListener("keydown", (event) => { this._handleKeyDown(event.keyCode); });
    }

    moveDown() {
        this._updateFieldForCurrentBlock(true);
        this._currentBlock.fieldPositionY += 1;

        let rollback = (this._getMaxBlockCellYOnField() >= this._model.height);
        if (!rollback) {
            rollback = this._isAnyBlockCellOverFieldCell();
        }

        if (rollback) {
            this._currentBlock.fieldPositionY -= 1;
            this._updateFieldForCurrentBlock(false);

            let removedRows = this._removeFullRows();
            this._moveRowsDownAfterRemoving(removedRows);

            this._generateNewBlock();
        } else {
            this._updateFieldForCurrentBlock(false);
        }
    }

    // Private
    _handleKeyDown(keyCode) {
        switch (keyCode) {
            case 37: // left
                this._moveLeft();
                break;
            case 38: // up
                this._rotate();
                break;
            case 39: // right
                this._moveRight();
                break;
            case 40: // down
                this.moveDown();
                break;
        }
    }

    _moveLeft() {
        this._updateFieldForCurrentBlock(true);
        this._currentBlock.fieldPositionX -= 1;

        let rollback = (this._getMinBlockCellXOnField() < 0);
        if (!rollback) {
            rollback = this._isAnyBlockCellOverFieldCell();
        }

        if (rollback) {
            this._currentBlock.fieldPositionX += 1;
        }

        this._updateFieldForCurrentBlock(false);
    }

    _moveRight() {
        this._updateFieldForCurrentBlock(true);
        this._currentBlock.fieldPositionX += 1;

        let rollback = (this._getMaxBlockCellXOnField() >= this._model.width);
        if (!rollback) {
            rollback = this._isAnyBlockCellOverFieldCell();
        }

        if (rollback) {
            this._currentBlock.fieldPositionX -= 1;
        }

        this._updateFieldForCurrentBlock(false);
    }

    // If there is no enough space on left or right for rotation -
    // try to move block right and left accordingly.
    // Rotation can not be performed if:
    // - there is no enough space on bottom
    // - after rotation any block cell is placed on already busy field cell
    _rotate() {
        this._updateFieldForCurrentBlock(true);
        this._currentBlock.rotate();

        let rollback = (this._getMaxBlockCellYOnField() >= this._model.height);
        if (rollback) {
            this._currentBlock.rotateBack();
            this._updateFieldForCurrentBlock(false);
            return;
        }

        let changeX = 0;

        let minBlockX = this._getMinBlockCellXOnField();
        if (minBlockX < 0) {
            changeX = -minBlockX; // Move right
        } else {
            let maxBlockX = this._getMaxBlockCellXOnField();
            if (maxBlockX >= this._model.width) {
                changeX = this._model.width - maxBlockX - 1; // Move left
            }
        }
        this._currentBlock.fieldPositionX += changeX;

        rollback = this._isAnyBlockCellOverFieldCell();
        if (rollback) {
            this._currentBlock.fieldPositionX -= changeX;
            this._currentBlock.rotateBack();
        }

        this._updateFieldForCurrentBlock(false);
    }

    _getMaxBlockCellYOnField() {
        let maxY = Number.MIN_SAFE_INTEGER;
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

    _getMinBlockCellXOnField() {
        let minX = Number.MAX_SAFE_INTEGER;
        for (let blockY = this._currentBlock.height - 1; blockY >= 0; --blockY) {
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

    _getMaxBlockCellXOnField() {
        let maxX = Number.MIN_SAFE_INTEGER;
        for (let blockY = this._currentBlock.height - 1; blockY >= 0; --blockY) {
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

    _isAnyBlockCellOverFieldCell() {
        for (let blockX = 0; blockX < this._currentBlock.width; ++blockX) {
            for (let blockY = this._currentBlock.height - 1; blockY >= 0; --blockY) {
                if (!this._currentBlock.isCellBusy(blockX, blockY)) {
                    continue;
                }

                let fieldX = this._currentBlock.fieldPositionX + blockX;
                let fieldY = this._currentBlock.fieldPositionY + blockY;
                if (this._model.isCellBusy(fieldX, fieldY)) {
                    return true;
                }
            }
        }
        return false;
    }

    _updateFieldForCurrentBlock(clearCells) {
        if (this._currentBlock === undefined) {
            return;
        }

        for (let blockX = 0; blockX < this._currentBlock.width; ++blockX) {
            for (let blockY = 0; blockY < this._currentBlock.height; ++blockY) {
                let fieldX = this._currentBlock.fieldPositionX + blockX;
                let fieldY = this._currentBlock.fieldPositionY + blockY;

                if (this._isCellPositionOk(fieldX, fieldY)) {
                    if (this._currentBlock.isCellBusy(blockX, blockY)) {
                        if (clearCells) {
                            this._model.setCell(fieldX, fieldY, null);
                        } else {
                            this._model.setCell(fieldX, fieldY, this._currentBlock.blockType);
                        }
                    }
                }
            }
        }
    }

    _generateNewBlock() {
        if (this._predefinedBlocks.length > 0) {
            let blockType = this._predefinedBlocks.shift();
            this._currentBlock = this._blockRepository.getBlockOfType(blockType);
        } else {
            this._currentBlock = this._blockRepository.getRandomBlock();
        }
        this._currentBlock.fieldPositionX = Math.ceil((this._model.width - this._currentBlock.width) / 2);
        this._currentBlock.fieldPositionY = -this._currentBlock.height;
    }

    _removeFullRows() {
        let fullRows = [];
        for (let fieldY = this._model.height - 1; fieldY >= 0; --fieldY) {
            let isRowFull = true;
            for (let fieldX = 0; fieldX < this._model.width; ++fieldX) {
                if (!this._model.isCellBusy(fieldX, fieldY)) {
                    isRowFull = false;
                    break;
                }
            }
            if (isRowFull) {
                this._model.clearRow(fieldY);
                fullRows.push(fieldY);
            }
        }
        return fullRows;
    }

    _moveRowsDownAfterRemoving(removedRows) {
        if (removedRows.length === 0) {
            return;
        }

        let moveOffset = 1;
        let lastRemovedRow = removedRows[0];
        for (let fieldY = lastRemovedRow - 1; fieldY >= 0; --fieldY) {
            if (removedRows.indexOf(fieldY) >= 0) {
                moveOffset += 1;
                continue;
            }

            let moveToY = fieldY + moveOffset;
            for (let fieldX = 0; fieldX < this._model.width; ++fieldX) {
                if (fieldY === 0) {
                    this._model.setCell(fieldX, fieldY, null);
                } else {
                    let cellValue = this._model.getCell(fieldX, fieldY);
                    this._model.setCell(fieldX, fieldY, null);
                    this._model.setCell(fieldX, moveToY, cellValue);
                }
            }
        }
    }

    _isCellPositionOk(x, y) {
        if (x >= 0 && x < this._model.width && y >= 0 && y < this._model.height) {
            return true;
        }
        return false;
    }
}
