import WhiteFrame from '../../../uicomponents/whiteframe'
import SpritesPool from '../../../utils/spritespool'
import Connector from '../../../utils/connector'
import BlockType from '../../../const/blocktype'
import Global from '../../../const/global'
import * as PIXI from 'pixi.js'

export default class Field extends PIXI.Container {
    constructor(fieldViewLogic) {
        super()

        this._viewLogic = fieldViewLogic;
        this._viewModel = fieldViewLogic.viewModel;

        this._cellSprites = [];

        this._frame = new WhiteFrame();
        this._container = new PIXI.Container();

        this._bgContainer = new PIXI.Container();
        this._cellsContainer = new PIXI.Container();

        this._container.addChild(this._bgContainer);
        this._container.addChild(this._cellsContainer);
        this._container.position.set(Global.UI_GAME_PADDING, Global.UI_GAME_PADDING);

        this.addChild(this._frame);
        this.addChild(this._container);

        Connector.connect(this._viewModel, this._viewModel.signalSizeChanged, this, this._slotOnSizeChanged);
        Connector.connect(this._viewModel, this._viewModel.signalCellChanged, this, this._slotOnCellChanged);
    }

    // Private slots
    _slotOnSizeChanged() {
        this._cellSprites.length = this._viewModel.width;
        for (let fieldX = 0; fieldX < this._viewModel.width; ++fieldX) {
            if (this._cellSprites[fieldX] === undefined) {
                this._cellSprites[fieldX] = new Array(this._viewModel.height);
            } else {
                this._cellSprites[fieldX].length = this._viewModel.height;
            }
        }

        this._drawBackground();

        this._frame.setSize(
            this._container.width + Global.UI_GAME_PADDING * 2,
            this._container.height + Global.UI_GAME_PADDING * 2
        )

        this.signalSizeChanged();
    }

    _slotOnCellChanged(fieldX, fieldY) {
        let cellSprite = this._cellSprites[fieldX][fieldY];
        if (cellSprite !== undefined) {
            this._cellsContainer.removeChild(cellSprite);
            SpritesPool.releaseSprite(cellSprite);
        }

        if (!this._viewModel.isCellBusy(fieldX, fieldY)) {
            this._cellSprites[fieldX][fieldY] = undefined;
            return;
        }

        let blockType = this._viewModel.getCell(fieldX, fieldY);
        let spriteName = this._getSpriteNameForBlockType(blockType);
        cellSprite = SpritesPool.getSprite('field', spriteName);

        this._cellsContainer.addChild(cellSprite);
        this._cellSprites[fieldX][fieldY] = cellSprite;

        cellSprite.x = fieldX * cellSprite.width;
        cellSprite.y = fieldY * cellSprite.height;
    }

    // Private
    _drawBackground() {
        for (let fieldX = 0; fieldX < this._viewModel.width; ++fieldX) {
            for (let fieldY = 0; fieldY < this._viewModel.height; ++fieldY) {
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

    // Signals
    signalSizeChanged() {}
}
