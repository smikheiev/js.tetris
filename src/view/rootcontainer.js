import PreloaderScene from './preloader/preloaderscene'
import MainMenuScene from './mainmenu/mainmenuscene'
import Connector from '../utils/connector'
import SceneType from '../const/scenetype'
import GameScene from './game/gamescene'
import * as PIXI from 'pixi.js'

export default class RootContainer extends PIXI.Container {
    constructor(rootLogic) {
        super();

        this._logic = rootLogic;
        this._model = rootLogic.model;

        this._preloaderScene = new PreloaderScene(rootLogic.preloaderLogic);
        this._mainMenuScene = new MainMenuScene(rootLogic.mainMenuLogic);
        this._gameScene = new GameScene(rootLogic.gameLogic);

        this._mainMenuScene.visible = false;
        this._gameScene.visible = false;

        this.addChild(this._preloaderScene);
        this.addChild(this._mainMenuScene);
        this.addChild(this._gameScene);

        Connector.connect(this._model, this._model.signalCurrentSceneChanged,
            this, this._slotOnCurrentSceneChanged);
    }

    // Private slots
    _slotOnCurrentSceneChanged() {
        switch (this._model.currentScene) {
            case SceneType.MAINMENU:
                this._preloaderScene.visible = false;
                this._mainMenuScene.visible = true;
                this._gameScene.visible = false;
                break;
            case SceneType.GAME:
                this._preloaderScene.visible = false;
                this._mainMenuScene.visible = false;
                this._gameScene.visible = true;
                break;
        }
    }
}
