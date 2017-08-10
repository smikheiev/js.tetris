import FieldLogic from './logic/fieldlogic'
import * as PIXI from 'pixi.js'

export default class Tetris {
    constructor() {
        console.log('Make tetris great again!');

        this._app = new PIXI.Application({
            'width': 600,
            'height': 600,
            'backgroundColor': 0x000000
        });
        document.body.appendChild(this._app.view);

        let fieldLogic = new FieldLogic(8, 10);
    }
}
