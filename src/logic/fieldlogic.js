import BlockRepository from './blocks/blocksrepository'
import BlockType from '../const/blocktype'

export default class FieldLogic {
    constructor(width, height) {
        this._width = width;
        this._height = height;

        this._blockRepository = new BlockRepository();

        this._initField();

        this._currentBlock = undefined;
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

    _isCellPositionOk(x, y) {
        if (x >= 0 && x < this._width && y >= 0 && y < this._height) {
            return true;
        }
        return false;
    }

    _getCellValue(x, y) {
        if (!this._isCellPositionOk(x, y)) {
            return undefined;
        }
        return this._field[x][y];
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
                fieldString += this._getCellValue(x, y);
                fieldString += ' ';
            }
            fieldString += '\n';
        }
        console.log(fieldString);
    }
}
