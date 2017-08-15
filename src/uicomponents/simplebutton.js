import TextHelpers from '../helpers/texthelpers'
import WhiteFrame from './whiteframe'
import * as PIXI from 'pixi.js'

export default class SimpleButton extends PIXI.Container {
    constructor() {
        super();

        this._size = new PIXI.Point(128, 32);

        this.interactive = true;
        this.buttonMode = true;

        this._frame = new WhiteFrame();

        this._text = new PIXI.Text('', TextHelpers.getTextStyle(12));
        this._text.anchor.set(0.5, 0.5);

        this.addChild(this._frame);
        this.addChild(this._text);

        this._update();
    }

    // Get/set
    get size() { return this._size; }

    // Public
    set({text = '', width = 0, height = 0, fontSize = 0}) {
        if (text.length > 0) {
            this._text.text = text;
        }
        if (width > 0) {
            this._size.x = width;
        }
        if (height > 0) {
            this._size.y = height;
        }
        if (fontSize > 0) {
            this._text.style.fontSize = fontSize;
        }
        this._update();
    }

    // Private
    _update() {
        this._frame.setSize(this._size.x, this._size.y);
        this._text.position.set(this._size.x >> 1, this._size.y >> 1);

        if (this.hitArea) {
            this.hitArea.width = this.width;
            this.hitArea.height = this.height;
        } else {
            this.hitArea = new PIXI.Rectangle(0, 0, this.width, this.height);
        }
    }
}
