import BlockRepository from './blocks/blocksrepository'
import BlockType from '../../../const/blocktype'

export default class FieldLogic {
    constructor(width = 10, height = 22) {
        this._width = width;
        this._height = height;

        this._blockRepository = new BlockRepository();

        this._initField();

        this._currentBlock = undefined;

        this._predefinedBlocks = [
            // BlockType.L, BlockType.J, BlockType.T, BlockType.O, BlockType.S, BlockType.Z, BlockType.I
        ]

        window.addEventListener("keydown", (event) => { this._handleKeyDown(event.keyCode); });

        this._generateNewBlock();
        this._updateFieldForCurrentBlock(false);
    }

    // Public

    get width() { return this._width; }
    get height() { return this._height; }

    addOnFieldChangedCallback(fn) {
        this._onFieldChangeCallback = fn;
    }

    isCellBusy(x, y) {
        if (!this._isCellPositionOk(x, y)) {
            return false;
        }

        return this.getCellValue(x, y) !== 0;
    }

    getCellValue(x, y) {
        if (!this._isCellPositionOk(x, y)) {
            return undefined;
        }
        return this._field[x][y];
    }

    // Private

    _initField() {
        if (this._width <= 0 || this._height <= 0) {
            throw new Error('Wrong field size: ' + this._width + ', ' + this._height);
        }

        this._field = new Array(this._width);
        for (let x = 0; x < this._width; ++x) {
            this._field[x] = new Array(this._height);
            for (let y = 0; y < this._height; ++y) {
                this._field[x][y] = 0;
            }
        }
    }

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
                this._moveDown();
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

        if (this._onFieldChangeCallback) {
            this._onFieldChangeCallback();
        }
    }

    _moveRight() {
        this._updateFieldForCurrentBlock(true);
        this._currentBlock.fieldPositionX += 1;

        let rollback = (this._getMaxBlockCellXOnField() >= this._width);
        if (!rollback) {
            rollback = this._isAnyBlockCellOverFieldCell();
        }

        if (rollback) {
            this._currentBlock.fieldPositionX -= 1;
        }

        this._updateFieldForCurrentBlock(false);

        if (this._onFieldChangeCallback) {
            this._onFieldChangeCallback();
        }
    }

    _moveDown() {
        this._updateFieldForCurrentBlock(true);
        this._currentBlock.fieldPositionY += 1;

        let rollback = (this._getMaxBlockCellYOnField() >= this._height);
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

        if (this._onFieldChangeCallback) {
            this._onFieldChangeCallback();
        }
    }

    // If there is no enough space on left or right for rotation -
    // try to move block right and left accordingly.
    // Rotation can not be performed if:
    // - there is no enough space on bottom
    // - after rotation any block cell is placed on already busy field cell
    _rotate() {
        this._updateFieldForCurrentBlock(true);
        this._currentBlock.rotate();

        let rollback = (this._getMaxBlockCellYOnField() >= this._height);
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
            if (maxBlockX >= this._width) {
                changeX = this._width - maxBlockX - 1; // Move left
            }
        }
        this._currentBlock.fieldPositionX += changeX;

        rollback = this._isAnyBlockCellOverFieldCell();
        if (rollback) {
            this._currentBlock.fieldPositionX -= changeX;
            this._currentBlock.rotateBack();
        }

        this._updateFieldForCurrentBlock(false);

        if (this._onFieldChangeCallback) {
            this._onFieldChangeCallback();
        }
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
                if (this.isCellBusy(fieldX, fieldY)) {
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
                            this._setCellValue(fieldX, fieldY, 0);
                        } else {
                            this._setCellValue(fieldX, fieldY, this._currentBlock.blockType);
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
        this._currentBlock.fieldPositionX = Math.ceil((this._width - this._currentBlock.width) / 2);
        this._currentBlock.fieldPositionY = -this._currentBlock.height;
    }

    _removeFullRows() {
        let fullRows = [];
        for (let fieldY = this._height - 1; fieldY >= 0; --fieldY) {
            let isRowFull = true;
            for (let fieldX = 0; fieldX < this._width; ++fieldX) {
                if (!this.isCellBusy(fieldX, fieldY)) {
                    isRowFull = false;
                    break;
                }
            }
            if (isRowFull) {
                for (let fieldX = 0; fieldX < this._width; ++fieldX) {
                    this._setCellValue(fieldX, fieldY, 0);
                }
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
            for (let fieldX = 0; fieldX < this._width; ++fieldX) {
                if (fieldY === 0) {
                    this._setCellValue(fieldX, fieldY, 0);
                } else {
                    let cellValue = this.getCellValue(fieldX, fieldY);
                    this._setCellValue(fieldX, fieldY, 0);
                    this._setCellValue(fieldX, moveToY, cellValue);
                }
            }
        }
    }

    _isCellPositionOk(x, y) {
        if (x >= 0 && x < this._width && y >= 0 && y < this._height) {
            return true;
        }
        return false;
    }

    _setCellValue(x, y, value) {
        if (!this._isCellPositionOk(x, y)) {
            return;
        }
        return this._field[x][y] = value;
    }

    _printField() {
        let fieldString = '';
        for (let y = 0; y < this._height; ++y) {
            for (let x = 0; x < this._width; ++x) {
                fieldString += this.getCellValue(x, y);
                fieldString += ' ';
            }
            fieldString += '\n';
        }
        console.log(fieldString);
    }
}
