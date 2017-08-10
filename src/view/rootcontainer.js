import GameScene from './game/gamescene'
import * as PIXI from 'pixi.js'

export default class RootContainer extends PIXI.Container {
    constructor(rootLogic) {
        super();

        this._rootLogic = rootLogic;

        this._gameScene = new GameScene(rootLogic.gameLogic);
        this.addChild(this._gameScene);
    }
}
