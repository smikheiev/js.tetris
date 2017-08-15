import PreloaderScene from './preloader/preloaderscene'
import MainMenuScene from './mainmenu/mainmenuscene'
import GameEndScene from './gameend/gameendscene'
import Connector from '../utils/connector'
import SceneType from '../const/scenetype'
import GameScene from './game/gamescene'
import * as PIXI from 'pixi.js'

export default class RootContainer extends PIXI.Container {
    constructor(rootViewLogic) {
        super();

        this._viewLogic = rootViewLogic;
        this._viewModel = rootViewLogic.viewModel;

        this._preloaderScene = new PreloaderScene(rootViewLogic.preloaderViewLogic);
        this._mainMenuScene = new MainMenuScene(rootViewLogic.mainMenuViewLogic);
        this._gameEndScene = new GameEndScene(rootViewLogic.gameEndViewLogic);
        this._gameScene = new GameScene(rootViewLogic.gameViewLogic);

        this._mainMenuScene.visible = false;
        this._gameEndScene.visible = false;
        this._gameScene.visible = false;

        this.addChild(this._preloaderScene);
        this.addChild(this._mainMenuScene);
        this.addChild(this._gameEndScene);
        this.addChild(this._gameScene);

        Connector.connect(this._viewModel, this._viewModel.signalCurrentSceneChanged,
            this, this._slotOnCurrentSceneChanged);
    }

    // Private slots
    _slotOnCurrentSceneChanged() {
        switch (this._viewModel.currentScene) {
            case SceneType.MAINMENU:
                this._preloaderScene.visible = false;
                this._mainMenuScene.visible = true;
                this._gameEndScene.visible = false;
                this._gameScene.visible = false;
                break;
            case SceneType.GAME:
                this._preloaderScene.visible = false;
                this._mainMenuScene.visible = false;
                this._gameEndScene.visible = false;
                this._gameScene.visible = true;
                break;
            case SceneType.GAMEENDED:
                this._preloaderScene.visible = false;
                this._mainMenuScene.visible = false;
                this._gameEndScene.visible = true;
                this._gameScene.visible = false;
                break;
        }
    }
}
