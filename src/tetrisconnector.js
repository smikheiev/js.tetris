import Connector from './utils/connector'

export default class TetrisConnector {
    constructor(rootLogic, rootManager) {
        this._rootLogic = rootLogic;
        this._rootManager = rootManager;
    }

    // Public
    connectAll() {
        this._connectManagers();
        this._connectLogic();
    }

    // Private
    _connectLogic() {
        Connector.connect(this.mainMenuLogic, this.mainMenuLogic.signalStartGameNeeded,
            this.rootLogic, this.rootLogic.slotOnStartGameNeeded);
        Connector.connect(this.mainMenuLogic, this.mainMenuLogic.signalStartGameNeeded,
            this.gameLogic, this.gameLogic.slotOnStartGameNeeded);

        Connector.connect(this.fieldLogic, this.fieldLogic.signalBlockLockedOnFieldTop,
            this.gameLogic, this.gameLogic.slotOnBlockLockedOnFieldTop);

        Connector.connect(this.gameLogic, this.gameLogic.signalGameEnded,
            this.rootLogic, this.rootLogic.slotOnGameEnded);

        Connector.connect(this.gameEndLogic, this.gameEndLogic.signalBackToMainMenuNeeded,
            this.rootLogic, this.rootLogic.slotOnBackToMainMenuNeeded);
    }

    _connectManagers() {
        Connector.connect(this.assetsManager, this.assetsManager.signalLoadProgress,
            this.preloaderLogic, this.preloaderLogic.slotOnAssetsLoadProgress);
        Connector.connect(this.assetsManager, this.assetsManager.signalLoadComplete,
            this.rootLogic, this.rootLogic.slotOnAssetsLoadComplete);

        Connector.connect(this.tickManager, this.tickManager.signalTick,
            this.gameLogic, this.gameLogic.slotOnTick);
    }

    // Logic getters
    get rootLogic() { return this._rootLogic; }
    get preloaderLogic() { return this.rootLogic.preloaderLogic; }
    get mainMenuLogic() { return this.rootLogic.mainMenuLogic; }
    get gameEndLogic() { return this.rootLogic.gameEndLogic; }
    get gameLogic() { return this.rootLogic.gameLogic; }
    get fieldLogic() { return this.gameLogic.fieldLogic; }

    // Manager getters
    get rootManager() { return this._rootManager; }
    get assetsManager() { return this.rootManager.assetsManager; }
    get tickManager() { return this.rootManager.tickManager; }
}
