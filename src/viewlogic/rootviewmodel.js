import SceneType from '../const/scenetype'

export default class RootViewModel {
    constructor() {
        this._currentScene = SceneType.PRELOADER;
    }

    // Get/set
    get currentScene() { return this._currentScene; }
    set currentScene(value) {
        if (this._currentScene !== value) {
            this._currentScene = value;
            this.signalCurrentSceneChanged();
        }
    }

    // Signals
    signalCurrentSceneChanged() {}
}
