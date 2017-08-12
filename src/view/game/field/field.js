import SpritesPool from '../../../utils/spritespool'
import BlockType from '../../../const/blocktype'
import * as PIXI from 'pixi.js'

export default class Field extends PIXI.Container {
    constructor(fieldLogic) {
        super()

        this._fieldLogic = fieldLogic;

        this._bgContainer = new PIXI.Container();
        this.addChild(this._bgContainer);

        this._cellsContainer = new PIXI.Container();
        this.addChild(this._cellsContainer);

        this._init();
    }

    // Private

    _init() {
        this._cellSprites = new Array(this._fieldLogic.width);
        for (let x = 0; x < this._fieldLogic.width; ++x) {
            this._cellSprites[x] = new Array(this._fieldLogic.height);
        }

        this._drawBackground();
        this._drawField();

        this._fieldLogic.addOnFieldChangedCallback(this._drawField.bind(this));
    }

    _drawBackground() {
        for (let fieldX = 0; fieldX < this._fieldLogic.width; ++fieldX) {
            for (let fieldY = 0; fieldY < this._fieldLogic.height; ++fieldY) {
                let bgSprite = SpritesPool.getSprite('field', 'background');
                this._bgContainer.addChild(bgSprite);
                bgSprite.x = fieldX * bgSprite.width;
                bgSprite.y = fieldY * bgSprite.height;
            }
        }
    }

    _drawField() {
        this._cellsContainer.removeChildren(0, this._cellsContainer.children.length);
        for (let fieldX = 0; fieldX < this._fieldLogic.width; ++fieldX) {
            for (let fieldY = 0; fieldY < this._fieldLogic.height; ++fieldY) {
                let cellSprite = this._cellSprites[fieldX][fieldY];
                this._cellSprites[fieldX][fieldY] = undefined;
                if (cellSprite !== undefined) {
                    this._cellsContainer.removeChild(cellSprite);
                    SpritesPool.releaseSprite(cellSprite);
                }

                if (!this._fieldLogic.isCellBusy(fieldX, fieldY)) {
                    continue;
                }

                let blockType = this._fieldLogic.getCellValue(fieldX, fieldY);
                let spriteName = this._getSpriteNameForBlockType(blockType);
                cellSprite = SpritesPool.getSprite('field', spriteName);

                this._cellsContainer.addChild(cellSprite);
                this._cellSprites[fieldX][fieldY] = cellSprite;

                cellSprite.x = fieldX * cellSprite.width;
                cellSprite.y = fieldY * cellSprite.height;
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
