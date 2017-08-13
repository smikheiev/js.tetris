import PreloaderModel from './preloadermodel'

export default class PreloaderLogic {
    constructor() {
        this._model = new PreloaderModel();
    }

    // Get/set
    get model() { return this._model; }

    // Public slots
    slotOnAssetsLoadProgress(loader, resource) {
        this._model.percentLoaded = loader.progress;
    }
}
