import SpritesPool from '../../../utils/spritespool'
import Connector from '../../../utils/connector'
import BlockType from '../../../const/blocktype'
import * as PIXI from 'pixi.js'

export default class Field extends PIXI.Container {
    constructor(fieldLogic) {
        super()

        this._logic = fieldLogic;
        this._model = fieldLogic.model;

        this._cellSprites = [];

        this._bgContainer = new PIXI.Container();
        this.addChild(this._bgContainer);

        this._cellsContainer = new PIXI.Container();
        this.addChild(this._cellsContainer);

        Connector.connect(this._model, this._model.signalSizeChanged, this, this._slotOnSizeChanged);
        Connector.connect(this._model, this._model.signalCellChanged, this, this._slotOnCellChanged);
        Connector.connect(this._model, this._model.signalRowRemoved, this, this._slotOnRowRemoved);
    }

    // Private slots

    _slotOnSizeChanged() {
        this._cellSprites.length = this._model.width;
        for (let fieldX = 0; fieldX < this._model.width; ++fieldX) {
            if (this._cellSprites[fieldX] === undefined) {
                this._cellSprites[fieldX] = new Array(this._model.height);
            } else {
                this._cellSprites[fieldX].length = this._model.height;
            }
        }

        this._drawBackground();
    }

    _slotOnCellChanged(fieldX, fieldY) {
        let cellSprite = this._cellSprites[fieldX][fieldY];
        if (cellSprite !== undefined) {
            this._cellsContainer.removeChild(cellSprite);
            SpritesPool.releaseSprite(cellSprite);
        }

        if (!this._model.isCellBusy(fieldX, fieldY)) {
            this._cellSprites[fieldX][fieldY] = undefined;
            return;
        }

        let blockType = this._model.getCell(fieldX, fieldY);
        let spriteName = this._getSpriteNameForBlockType(blockType);
        cellSprite = SpritesPool.getSprite('field', spriteName);

        this._cellsContainer.addChild(cellSprite);
        this._cellSprites[fieldX][fieldY] = cellSprite;

        cellSprite.x = fieldX * cellSprite.width;
        cellSprite.y = fieldY * cellSprite.height;
    }

    _slotOnRowRemoved(fieldY) {
        for (let fieldX = 0; fieldX < this._model.width; ++fieldX) {
            let cellSprite = this._cellSprites[fieldX][fieldY];
            if (cellSprite !== undefined) {
                this._cellsContainer.removeChild(cellSprite);
                SpritesPool.releaseSprite(cellSprite);
                this._cellSprites[fieldX][fieldY] = undefined;
            }
        }
    }

    // Private

    _drawBackground() {
        for (let fieldX = 0; fieldX < this._model.width; ++fieldX) {
            for (let fieldY = 0; fieldY < this._model.height; ++fieldY) {
                let bgSprite = SpritesPool.getSprite('field', 'background');
                this._bgContainer.addChild(bgSprite);
                bgSprite.x = fieldX * bgSprite.width;
                bgSprite.y = fieldY * bgSprite.height;
            }
        }
    }

    _getSpriteNameForBlockType(blockType) {
        switch (blockType) {
            case BlockType.I:
                return 'block_blue';
            case BlockType.J:
                return 'block_cyan';
            case BlockType.L:
                return 'block_green';
            case BlockType.O:
                return 'block_orange';
            case BlockType.S:
                return 'block_purple';
            case BlockType.T:
                return 'block_red';
            case BlockType.Z:
                return 'block_yellow';
        }
        return '';
    }
}
