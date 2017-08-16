import { BlockMoveChecker, MoveData } from './blockmovechecker'
import BlocksRepository from './blocks/blocksrepository'
import FullRowChecker from './fullrowchecker'
import GameEndChecker from './gameendchecker'
import BlockType from '../const/blocktype'
import ScoreCounter from './scorecounter'
import FieldMatrix from './fieldmatrix'

export default class GameLogic {
    constructor(width, height, callbacks) {
        this._width = width;
        this._height = height;
        this._callbacks = callbacks;

        this._scoreCounter = new ScoreCounter();
        this._blocksRepository = new BlocksRepository();
        this._fieldMatrix = new FieldMatrix(width, height);
        this._fullRowChecker = new FullRowChecker(this._fieldMatrix);
        this._gameEndChecker = new GameEndChecker(this._fieldMatrix);
        this._blockMoveChecker = new BlockMoveChecker(this._fieldMatrix);

        this._currentBlock = undefined;
        this._predefinedBlocks = [
            // BlockType.L, BlockType.J, BlockType.T, BlockType.O, BlockType.S, BlockType.Z, BlockType.I
        ]

        this._generateNewBlock();
    }

    // Public
    tryMoveLeft() {
        let moveData = this._blockMoveChecker.canMoveLeft();
        if (moveData.canMove) {
            this._moveCurrentBlock(moveData.xOffset, 0);
        }
    }

    tryMoveRight() {
        let moveData = this._blockMoveChecker.canMoveRight();
        if (moveData.canMove) {
            this._moveCurrentBlock(moveData.xOffset, 0);
        }
    }

    tryMoveUp() {
        let moveData = this._blockMoveChecker.canMoveUp();
        if (moveData.canMove) {
            this._moveCurrentBlock(0, moveData.yOffset);
        }
    }

    tryMoveDown() {
        let moveData = this._blockMoveChecker.canMoveDown();
        if (moveData.canMove) {
            this._moveCurrentBlock(0, moveData.yOffset);
        } else {
            this._endRound();
        }
    }

    tryRotate() {
        let moveData = this._blockMoveChecker.canRotate();
        if (moveData.canMove) {
            this._rotateCurrentBlock(moveData.xOffset, moveData.yOffset);
        }
    }

    // Private
    _moveCurrentBlock(xOffset, yOffset) {
        if (this._currentBlock === undefined) {
            return;
        }

        // TODO: improve this
        this._updateCurrentBlockCellsOnField(true);
        this._currentBlock.fieldPositionX += xOffset;
        this._currentBlock.fieldPositionY += yOffset;
        this._updateCurrentBlockCellsOnField(false);
    }

    _rotateCurrentBlock(xOffset, yOffset) {
        if (this._currentBlock === undefined) {
            return;
        }

        // TODO: improve this
        this._updateCurrentBlockCellsOnField(true);
        this._currentBlock.rotate();
        this._currentBlock.fieldPositionX += xOffset;
        this._currentBlock.fieldPositionY += yOffset;
        this._updateCurrentBlockCellsOnField(false);
    }

    _updateCurrentBlockCellsOnField(clearCells) {
        for (let blockX = 0; blockX < this._currentBlock.width; ++blockX) {
            for (let blockY = 0; blockY < this._currentBlock.height; ++blockY) {
                if (!this._currentBlock.isCellBusy(blockX, blockY)) {
                    continue;
                }

                let fieldX = this._currentBlock.fieldPositionX + blockX;
                let fieldY = this._currentBlock.fieldPositionY + blockY;

                if (clearCells) {
                    this._callbacks.callbackClearCellValue(fieldX, fieldY);
                } else {
                    this._callbacks.callbackSetCellValue(fieldX, fieldY, this._currentBlock.blockType);
                }
            }
        }
    }

    _endRound() {
        this._lockCurrentBlockCells();
        this._currentBlock = undefined;

        let fullRows = this._fullRowChecker.getFullRows();
        if (fullRows.length > 0) {
            this._removeFullRows(fullRows);
            this._moveRowsDown(fullRows);
        }

        let gameEnded = this._gameEndChecker.isGameEnded();
        if (gameEnded) {
            this._callbacks.callbackGameEnded();
        } else {
            this._generateNewBlock();
        }

        this._scoreCounter.roundEnded();
    }

    _lockCurrentBlockCells() {
        for (let blockX = 0; blockX < this._currentBlock.width; ++blockX) {
            for (let blockY = 0; blockY < this._currentBlock.height; ++blockY) {
                if (!this._currentBlock.isCellBusy(blockX, blockY)) {
                    continue;
                }

                let fieldX = this._currentBlock.fieldPositionX + blockX;
                let fieldY = this._currentBlock.fieldPositionY + blockY;

                this._fieldMatrix.setCellValue(fieldX, fieldY, this._currentBlock.blockType);
            }
        }
    }

    _removeFullRows(fullRows) {
        for (let i = 0; i < fullRows.length; ++i) {
            this._scoreCounter.rowWillBeRemoved();

            let y = fullRows[i];
            for (let x = 0; x < this._width; ++x) {
                this._fieldMatrix.setCellAsFree(x, y);

                this._scoreCounter.cellRemoved();

                this._callbacks.callbackRemoveCell(x, y);
            }
        }

        this._callbacks.callbackScoreChanged(this._scoreCounter.currentScore);
    }

    _moveRowsDown(removedRows) {
        let moveOffset = 1;

        let lastRemovedRow = removedRows[0];
        for (let fieldY = lastRemovedRow - 1; fieldY >= 0; --fieldY) {
            if (removedRows.indexOf(fieldY) >= 0) {
                moveOffset += 1;
                continue;
            }

            let moveToY = fieldY + moveOffset;
            for (let fieldX = 0; fieldX < this._width; ++fieldX) {
                let isCellBusy = this._fieldMatrix.isCellBusy(fieldX, fieldY);
                let cellValue = this._fieldMatrix.moveCell(fieldX, fieldY, fieldX, moveToY);

                this._callbacks.callbackClearCellValue(fieldX, fieldY);
                if (isCellBusy) {
                    this._callbacks.callbackSetCellValue(fieldX, moveToY, cellValue);
                }
            }
        }
    }

    _generateNewBlock() {
        let newBlock;
        if (this._predefinedBlocks.length > 0) {
            let blockType = this._predefinedBlocks.shift();
            newBlock = this._blocksRepository.getBlockOfType(blockType);
        } else {
            newBlock = this._blocksRepository.getRandomBlock();
        }
        newBlock.fieldPositionX = (this._width - newBlock.width) >> 1;
        newBlock.fieldPositionY = -newBlock.height;

        this._setCurrentBlock(newBlock);
    }

    _setCurrentBlock(block) {
        if (this._currentBlock !== undefined) {
            console.error('Setting new current block while old one still exists');
        }

        this._currentBlock = block;
        this._gameEndChecker.currentBlock = block;
        this._blockMoveChecker.currentBlock = block;
    }
}
