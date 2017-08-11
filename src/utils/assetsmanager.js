export default class AssetsManager {
    constructor() {
        this._loadProgressHandler = undefined;
        this._loadCompleteHandler = undefined;
    }

    // Public

    set loadProgressHandler(value) { this._loadProgressHandler = value; }
    set loadCompleteHandler(value) { this._loadCompleteHandler = value; }

    load() {
        PIXI.loader
            .add([
                AssetsManager.resolveSpritePath('field', 'background'),
                AssetsManager.resolveSpritePath('field', 'block_blue'),
                AssetsManager.resolveSpritePath('field', 'block_cyan'),
                AssetsManager.resolveSpritePath('field', 'block_green'),
                AssetsManager.resolveSpritePath('field', 'block_orange'),
                AssetsManager.resolveSpritePath('field', 'block_purple'),
                AssetsManager.resolveSpritePath('field', 'block_red'),
                AssetsManager.resolveSpritePath('field', 'block_yellow'),
            ])
            .on('progress', this._loadProgressHandler)
            .load(this._loadCompleteHandler);
    }

    static resolveSpritePath(folderName, spriteName) {
        return 'assets/' + folderName + '/' + spriteName + '.png';
    }

    static getTexture(path) {
        return PIXI.loader.resources[path].texture;
    }

    static getSprite(folderName, spriteName) {
        let path = AssetsManager.resolveSpritePath(folderName, spriteName);
        let texture = AssetsManager.getTexture(path);
        return new PIXI.Sprite(texture);
    }
}
