import RootManager from './managers/rootmanager'
import RootContainer from './view/rootcontainer'
import TetrisConnector from './tetrisconnector'
import RootLogic from './logic/rootlogic'
import * as PIXI from 'pixi.js'

export default class Tetris {
    constructor() {
        console.log('Make tetris great again!');

        this._app = new PIXI.Application({
            'width': 600,
            'height': 600,
            'backgroundColor': 0x000000
        });
        document.body.appendChild(this._app.view);

        this._init();
    }

    // Private
    _init() {
        this._rootLogic = new RootLogic();
        this._rootManager = new RootManager();

        this._tetrisConnector = new TetrisConnector(this._rootLogic, this._rootManager);
        this._tetrisConnector.connectAll();

        this._rootContainer = new RootContainer(this._rootLogic);
        this._app.stage.addChild(this._rootContainer);
        this._rootManager.assetsManager.load();
    }
}
