import Field from './field/field'
import * as PIXI from 'pixi.js'

export default class GameScene extends PIXI.Container {
    constructor(gameViewLogic) {
        super();

        this._gameViewLogic = gameViewLogic;

        this._field = new Field(gameViewLogic.fieldViewLogic);
        this.addChild(this._field);
    }
}
