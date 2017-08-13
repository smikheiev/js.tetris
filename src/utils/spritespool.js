import SmartSprite from './smartsprite'

class SpritesPool {
    constructor() {
        this._poolsMap = new Map();
    }

    // Public
    getSprite(folderName, spriteName) {
        let pool = this._getPool(folderName, spriteName);
        return pool.getSprite();
    }

    releaseSprite(sprite) {
        let pool = this._getPool(sprite.folderName, sprite.spriteName);
        pool.releaseSprite(sprite);
    }

    // Private
    _getPool(folderName, spriteName) {
        let key = folderName + spriteName;
        let pool;
        if (this._poolsMap.has(key)) {
            pool = this._poolsMap.get(key);
        } else {
            pool = new SpritePool(folderName, spriteName);
            this._poolsMap.set(key, pool);
        }
        return pool;
    }
}

class SpritePool {
    constructor(folderName, spriteName) {
        this._folderName = folderName;
        this._spriteName = spriteName;
        this._pool = new Array();
        this._index = 0;
        this._grow();
    }

    // Public
    getSprite() {
        if (this._index === this._pool.length) {
            this._grow();
        }

        let sprite = this._pool[this._index];
        this._pool[this._index] = null;
        this._index += 1;

        return sprite;
    }

    releaseSprite(sprite) {
        if (this._index === 0) {
            this._pool[this._pool.length] = sprite;
        } else {
            this._index -= 1;
            this._pool[this._index] = sprite;
        }
    }

    // Private
    _grow() {
        let prevLength = this._pool.length;
        let newLength = prevLength + 10; // TODO: remove hardcode

        this._pool.length = newLength;
        for (let i = prevLength; i < newLength; ++i) {
            let sprite = new SmartSprite(this._folderName, this._spriteName);
            this._pool[i] = sprite;
        }
    }
}

export default new SpritesPool();
