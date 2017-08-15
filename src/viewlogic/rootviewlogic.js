import PreloaderViewLogic from './preloader/preloaderviewlogic'
import MainMenuViewLogic from './mainmenu/mainmenuviewlogic'
import GameEndViewLogic from './gameend/gameendviewlogic'
import GameViewLogic from './game/gameviewlogic'
import SceneType from '../const/scenetype'
import RootViewModel from './rootviewmodel'

export default class RootViewLogic {
    constructor() {
        this._viewModel = new RootViewModel();

        this._preloaderViewLogic = new PreloaderViewLogic();
        this._mainMenuViewLogic = new MainMenuViewLogic();
        this._gameEndViewLogic = new GameEndViewLogic();
        this._gameViewLogic = new GameViewLogic();
    }

    // Get/set
    get preloaderViewLogic() { return this._preloaderViewLogic; }
    get mainMenuViewLogic() { return this._mainMenuViewLogic; }
    get gameEndViewLogic() { return this._gameEndViewLogic; }
    get gameViewLogic() { return this._gameViewLogic; }
    get viewModel() { return this._viewModel; }

    // Public slots
    slotOnAssetsLoadComplete() {
        this.viewModel.currentScene = SceneType.MAINMENU;
    }

    slotOnStartGameNeeded() {
        this.viewModel.currentScene = SceneType.GAME;
    }

    slotOnGameEnded() {
        this.viewModel.currentScene = SceneType.GAMEENDED;
    }

    slotOnBackToMainMenuNeeded() {
        this.viewModel.currentScene = SceneType.MAINMENU;
    }
}
