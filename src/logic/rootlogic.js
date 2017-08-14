import PreloaderLogic from './preloader/preloaderlogic'
import MainMenuLogic from './mainmenu/mainmenulogic'
import GameEndLogic from './gameend/gameendlogic'
import SceneType from '../const/scenetype'
import GameLogic from './game/gamelogic'
import RootModel from './rootmodel'

export default class RootLogic {
    constructor() {
        this._model = new RootModel();

        this._preloaderLogic = new PreloaderLogic();
        this._mainMenuLogic = new MainMenuLogic();
        this._gameEndLogic = new GameEndLogic();
        this._gameLogic = new GameLogic();
    }

    // Get/set
    get preloaderLogic() { return this._preloaderLogic; }
    get mainMenuLogic() { return this._mainMenuLogic; }
    get gameEndLogic() { return this._gameEndLogic; }
    get gameLogic() { return this._gameLogic; }
    get model() { return this._model; }

    // Public slots
    slotOnAssetsLoadComplete() {
        this.model.currentScene = SceneType.MAINMENU;
    }

    slotOnStartGameNeeded() {
        this.model.currentScene = SceneType.GAME;
    }

    slotOnGameEnded() {
        this.model.currentScene = SceneType.GAMEENDED;
    }

    slotOnBackToMainMenuNeeded() {
        this.model.currentScene = SceneType.MAINMENU;
    }
}
