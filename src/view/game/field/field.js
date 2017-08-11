import AssetsManager from '../../../utils/assetsmanager'
import BlockType from '../../../const/blocktype'
import * as PIXI from 'pixi.js'

export default class Field extends PIXI.Container {
    constructor(fieldLogic) {
        super()

        this._fieldLogic = fieldLogic;

        this._bgContainer = new PIXI.Container();
        this.addChild(this._bgContainer);

        this._blocksContainer = new PIXI.Container();
        this.addChild(this._blocksContainer);

        this._init();
    }

    // Private

    _init() {
        this._drawBackground();
        this._drawField();

        this._fieldLogic.addOnFieldChangedCallback(this._drawField.bind(this));
    }

    _drawBackground() {
        for (let fieldX = 0; fieldX < this._fieldLogic.width; ++fieldX) {
            for (let fieldY = 0; fieldY < this._fieldLogic.height; ++fieldY) {
                let bgSprite = AssetsManager.getSprite('field', 'background')
                this._bgContainer.addChild(bgSprite);
                bgSprite.x = fieldX * bgSprite.width;
                bgSprite.y = fieldY * bgSprite.height;
            }
        }
    }

    _drawField() {
        this._blocksContainer.removeChildren(0, this._blocksContainer.children.length);
        for (let fieldX = 0; fieldX < this._fieldLogic.width; ++fieldX) {
            for (let fieldY = 0; fieldY < this._fieldLogic.height; ++fieldY) {
                if (!this._fieldLogic.isCellBusy(fieldX, fieldY)) {
                    continue;
                }

                let blockType = this._fieldLogic.getCellValue(fieldX, fieldY);
                let blockSpriteName = this._getSpriteNameForBlockType(blockType);
                let blockSprite = AssetsManager.getSprite('field', blockSpriteName);
                this._blocksContainer.addChild(blockSprite);
                blockSprite.x = fieldX * blockSprite.width;
                blockSprite.y = fieldY * blockSprite.height;
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
