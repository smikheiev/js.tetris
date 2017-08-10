import Field from './field/field'
import * as PIXI from 'pixi.js'

export default class GameScene extends PIXI.Container {
    constructor(gameLogic) {
        super();

        this._gameLogic = gameLogic;

        this._field = new Field(gameLogic.fieldLogic);
        this.addChild(this._field);
    }
}
