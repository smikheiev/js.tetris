export default class PreloaderViewModel {
    constructor() {
        this._percentLoaded = 0.0;
    }

    // Get/set
    get percentLoaded() { return this._percentLoaded; }
    set percentLoaded(value) {
        if (this._percentLoaded !== value) {
            this._percentLoaded = value;
            this.signalPercentLoadedChanged();
        }
    }

    // Signals
    signalPercentLoadedChanged() {}
}
