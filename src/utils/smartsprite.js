import AssetsManager from './assetsmanager'
import * as PIXI from 'pixi.js'

export default class SmartSprite extends PIXI.Sprite {
    constructor(folderName, spriteName) {
        let path = AssetsManager.resolveSpritePath(folderName, spriteName);
        let texture = AssetsManager.getTexture(path);
        super(texture);

        this._folderName = folderName;
        this._spriteName = spriteName;
        this._path = path;
    }

    // Public

    get folderName() { return this._folderName; }
    get spriteName() { return this._spriteName; }
    get path() { return this._path; }
}
