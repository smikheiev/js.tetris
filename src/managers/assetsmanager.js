import AssetsHelpers from '../helpers/assetshelpers'
import * as PIXI from 'pixi.js'

export default class AssetsManager {
    // Public
    load() {
        PIXI.loader
            .add([
                AssetsHelpers.resolveSpritePath('field', 'background'),
                AssetsHelpers.resolveSpritePath('field', 'block_blue'),
                AssetsHelpers.resolveSpritePath('field', 'block_cyan'),
                AssetsHelpers.resolveSpritePath('field', 'block_green'),
                AssetsHelpers.resolveSpritePath('field', 'block_orange'),
                AssetsHelpers.resolveSpritePath('field', 'block_purple'),
                AssetsHelpers.resolveSpritePath('field', 'block_red'),
                AssetsHelpers.resolveSpritePath('field', 'block_yellow'),
            ])
            .on('progress', this.signalLoadProgress)
            .load(this.signalLoadComplete);
    }

    // Signals
    signalLoadProgress(loader, resource) {}
    signalLoadComplete() {}
}
