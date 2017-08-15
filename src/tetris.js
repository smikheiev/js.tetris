import RootViewLogic from './viewlogic/rootviewlogic'
import RootManager from './managers/rootmanager'
import RootContainer from './view/rootcontainer'
import TetrisConnector from './tetrisconnector'
import KeyCode from './const/keycode'
import Global from './const/global'
import * as PIXI from 'pixi.js'

export default class Tetris {
    constructor() {
        console.log('Make tetris great again!');

        this._app = new PIXI.Application({
            'width': Global.WIDTH,
            'height': Global.HEIGHT,
            'backgroundColor': 0x000000
        });
        document.body.appendChild(this._app.view);

        this._init();
    }

    // Private
    _init() {
        this._rootViewLogic = new RootViewLogic();
        this._rootManager = new RootManager();

        this._tetrisConnector = new TetrisConnector(this._rootViewLogic, this._rootManager);
        this._tetrisConnector.connectAll();

        this._rootContainer = new RootContainer(this._rootViewLogic);
        this._app.stage.addChild(this._rootContainer);

        this._rootManager.keyboardManager.addKeysToHandle([KeyCode.KEY_LEFT, KeyCode.KEY_RIGHT, KeyCode.KEY_UP, KeyCode.KEY_DOWN]);
        this._rootManager.assetsManager.load();
    }
}
