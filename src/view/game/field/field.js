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

        PIXI.loader
            .add([
                'assets/field/background.png',
                'assets/field/block_blue.png',
                'assets/field/block_cyan.png',
                'assets/field/block_green.png',
                'assets/field/block_orange.png',
                'assets/field/block_purple.png',
                'assets/field/block_red.png',
                'assets/field/block_yellow.png'
            ])
            .load(this._init.bind(this));
    }

    // Private

    _init() {
        this._drawBackground();
        this._drawField();

        this._fieldLogic.addOnFieldChangedCallback(this._drawField.bind(this));
    }

    _drawBackground() {
        let bgTex = PIXI.loader.resources['assets/field/background.png'].texture;
        for (let fieldX = 0; fieldX < this._fieldLogic.width; ++fieldX) {
            for (let fieldY = 0; fieldY < this._fieldLogic.height; ++fieldY) {
                let bgSprite = new PIXI.Sprite(bgTex);
                this._bgContainer.addChild(bgSprite);
                bgSprite.x = fieldX * bgTex.width;
                bgSprite.y = fieldY * bgTex.height;
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
                let blockTexName = this._getTextureNameForBlockType(blockType);
                let blockTex = PIXI.loader.resources[blockTexName].texture;
                let blockSprite = new PIXI.Sprite(blockTex);
                this._blocksContainer.addChild(blockSprite);
                blockSprite.x = fieldX * blockTex.width;
                blockSprite.y = fieldY * blockTex.height;
            }
        }
    }

    _getTextureNameForBlockType(blockType) {
        switch (blockType) {
            case BlockType.I:
                return 'assets/field/block_blue.png';
            case BlockType.J:
                return 'assets/field/block_cyan.png';
            case BlockType.L:
                return 'assets/field/block_green.png';
            case BlockType.O:
                return 'assets/field/block_orange.png';
            case BlockType.S:
                return 'assets/field/block_purple.png';
            case BlockType.T:
                return 'assets/field/block_red.png';
            case BlockType.Z:
                return 'assets/field/block_yellow.png';
        }
        return '';
    }
}
