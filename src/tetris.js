import AssetsManager from './utils/assetsmanager'
import RootContainer from './view/rootcontainer'
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

        this._assetsManager = new AssetsManager();
        this._assetsManager.loadProgressHandler = this._onAssetsLoadProgress.bind(this);
        this._assetsManager.loadCompleteHandler = this._onAssetsLoadComplete.bind(this);
        this._assetsManager.load();
    }

    // Private

    _onAssetsLoadProgress(loader, resource) {
        console.log('Loading [' + resource.url + '] ' + loader.progress + '%');
    }

    _onAssetsLoadComplete() {
        this._rootLogic = new RootLogic();

        this._rootContainer = new RootContainer(this._rootLogic);
        this._app.stage.addChild(this._rootContainer);
    }
}
