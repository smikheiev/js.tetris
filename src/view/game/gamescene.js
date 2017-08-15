import Connector from '../../utils/connector'
import Global from '../../const/global'
import Field from './field/field'
import Score from './score/score'
import * as PIXI from 'pixi.js'

export default class GameScene extends PIXI.Container {
    constructor(gameViewLogic) {
        super();

        this._gameViewLogic = gameViewLogic;

        this._field = new Field(gameViewLogic.fieldViewLogic);
        this._field.position.set(Global.UI_GAME_PADDING, Global.UI_GAME_PADDING);

        this._score = new Score();

        this.addChild(this._field);
        this.addChild(this._score);

        Connector.connect(this._field, this._field.signalSizeChanged,
            this, this._slotOnFieldSizeChanged)
    }

    // Private slots
    _slotOnFieldSizeChanged() {
        this._score.position.set(
            this._field.x + this._field.width + Global.UI_GAME_PADDING,
            this._field.y
        );
    }
}
