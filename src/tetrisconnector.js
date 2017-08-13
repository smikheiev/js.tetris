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
        Connector.connect(this.rootLogic, this.rootLogic.signalStartGameNeeded,
            this.gameLogic, this.gameLogic.slotOnStartGame);
    }

    _connectManagers() {
        Connector.connect(this.assetsManager, this.assetsManager.signalLoadProgress,
            this.rootLogic, this.rootLogic.slotOnAssetsLoadProgress);
        Connector.connect(this.assetsManager, this.assetsManager.signalLoadComplete,
            this.rootLogic, this.rootLogic.slotOnAssetsLoadComplete);

        Connector.connect(this.tickManager, this.tickManager.signalTick,
            this.gameLogic, this.gameLogic.slotOnTick);
    }

    // Logic getters
    get rootLogic() { return this._rootLogic; }
    get gameLogic() { return this.rootLogic.gameLogic; }
    get fieldLogic() { return this.gameLogic.fieldLogic; }

    // Manager getters
    get rootManager() { return this._rootManager; }
    get assetsManager() { return this.rootManager.assetsManager; }
    get tickManager() { return this.rootManager.tickManager; }
}
