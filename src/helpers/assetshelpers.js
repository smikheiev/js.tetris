import * as PIXI from 'pixi.js'

export default class AssetsHelpers {
    // Public
    static resolveSpritePath(folderName, spriteName) {
        return 'assets/' + folderName + '/' + spriteName + '.png';
    }

    static getTexture(path) {
        return PIXI.loader.resources[path].texture;
    }
}
