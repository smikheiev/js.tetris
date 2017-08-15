import PreloaderViewModel from './preloaderviewmodel'

export default class PreloaderViewLogic {
    constructor() {
        this._viewModel = new PreloaderViewModel();
    }

    // Get/set
    get viewModel() { return this._viewModel; }

    // Public slots
    slotOnAssetsLoadProgress(loader, resource) {
        this._viewModel.percentLoaded = loader.progress;
    }
}
