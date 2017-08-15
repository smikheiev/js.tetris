import * as PIXI from 'pixi.js'

export default class WhiteFrame extends PIXI.Graphics {
    constructor(width = 0, height = 0) {
        super();

        this._size = new PIXI.Point(width, height);
    }

    // Get/set
    get size() { return this._size; }

    // Public
    setSize(width, height) {
        this._size.x = width;
        this._size.y = height;
        this._redraw();
    }

    // Private
    _redraw() {
        this.clear();
        this.lineStyle(1, 0xffffff, 0.8);
        this.drawRect(0, 0, this._size.x, this._size.y);
    }
}
