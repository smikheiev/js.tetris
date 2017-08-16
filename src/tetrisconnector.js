import Connector from './utils/connector'

export default class TetrisConnector {
    constructor(rootViewLogic, rootManager) {
        this._rootViewLogic = rootViewLogic;
        this._rootManager = rootManager;
    }

    // Public
    connectAll() {
        this._connectManagers();
        this._connectLogic();
    }

    // Private
    _connectLogic() {
        Connector.connect(this.mainMenuViewLogic, this.mainMenuViewLogic.signalStartGameNeeded,
            this.rootViewLogic, this.rootViewLogic.slotOnStartGameNeeded);
        Connector.connect(this.mainMenuViewLogic, this.mainMenuViewLogic.signalStartGameNeeded,
            this.gameViewLogic, this.gameViewLogic.slotOnStartGameNeeded);
        Connector.connect(this.mainMenuViewLogic, this.mainMenuViewLogic.signalStartGameNeeded,
            this.fieldViewLogic, this.fieldViewLogic.slotOnStartGameNeeded);
        Connector.connect(this.mainMenuViewLogic, this.mainMenuViewLogic.signalStartGameNeeded,
            this.scoreViewLogic, this.fieldViewLogic.slotOnStartGameNeeded);

        Connector.connect(this.gameViewLogic, this.gameViewLogic.signalGameEnded,
            this.rootViewLogic, this.rootViewLogic.slotOnGameEnded);
        Connector.connect(this.gameViewLogic, this.gameViewLogic.signalGameEnded,
            this.fieldViewLogic, this.fieldViewLogic.slotOnGameEnded);

        Connector.connect(this.gameViewLogic, this.gameViewLogic.signalRemoveCell,
            this.fieldViewLogic, this.fieldViewLogic.slotOnRemoveCell);

        Connector.connect(this.gameViewLogic, this.gameViewLogic.signalScoreChanged,
            this.scoreViewLogic, this.scoreViewLogic.slotOnScoreChanged);

        Connector.connect(this.gameEndViewLogic, this.gameEndViewLogic.signalBackToMainMenuNeeded,
            this.rootViewLogic, this.rootViewLogic.slotOnBackToMainMenuNeeded);
    }

    _connectManagers() {
        Connector.connect(this.assetsManager, this.assetsManager.signalLoadProgress,
            this.preloaderViewLogic, this.preloaderViewLogic.slotOnAssetsLoadProgress);
        Connector.connect(this.assetsManager, this.assetsManager.signalLoadComplete,
            this.rootViewLogic, this.rootViewLogic.slotOnAssetsLoadComplete);

        Connector.connect(this.tickManager, this.tickManager.signalTick,
            this.gameViewLogic, this.gameViewLogic.slotOnTick);

        Connector.connect(this.keyboardManager, this.keyboardManager.signalKeyDown,
            this.gameViewLogic, this.gameViewLogic.slotOnKeyDown);
    }

    // Logic getters
    get rootViewLogic() { return this._rootViewLogic; }
    get preloaderViewLogic() { return this.rootViewLogic.preloaderViewLogic; }
    get mainMenuViewLogic() { return this.rootViewLogic.mainMenuViewLogic; }
    get gameEndViewLogic() { return this.rootViewLogic.gameEndViewLogic; }
    get gameViewLogic() { return this.rootViewLogic.gameViewLogic; }
    get fieldViewLogic() { return this.gameViewLogic.fieldViewLogic; }
    get scoreViewLogic() { return this.gameViewLogic.scoreViewLogic; }

    // Manager getters
    get rootManager() { return this._rootManager; }
    get keyboardManager() { return this._rootManager.keyboardManager; }
    get assetsManager() { return this.rootManager.assetsManager; }
    get tickManager() { return this.rootManager.tickManager; }
}
