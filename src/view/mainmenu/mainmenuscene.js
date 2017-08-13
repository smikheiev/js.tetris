import Global from '../../const/global'
import * as PIXI from 'pixi.js'

export default class MainMenuScene extends PIXI.Container {
    constructor(mainMenuLogic) {
        super();

        this._logic = mainMenuLogic;
        this._model = mainMenuLogic.model;

        let style = {
            fontFamily: 'Verdana',
            fontSize: 32,
            fill: 'white'
        }

        let buttonsContainer = new PIXI.Container();

        let normalFieldButton = new PIXI.Text("Normal field", style);
        normalFieldButton.anchor.set(0.5, 0);
        normalFieldButton.position.set(0, 0);
        normalFieldButton.interactive = true;
        normalFieldButton.buttonMode = true;
        normalFieldButton.on("mouseup", this._onNormalFieldButtonClicked.bind(this));
        buttonsContainer.addChild(normalFieldButton);

        let bigFieldButton = new PIXI.Text("Big field", style);
        bigFieldButton.anchor.set(0.5, 0);
        bigFieldButton.position.set(0, normalFieldButton.height + 15);
        bigFieldButton.interactive = true;
        bigFieldButton.buttonMode = true;
        bigFieldButton.on("mouseup", this._onBigFieldButtonClicked.bind(this));
        buttonsContainer.addChild(bigFieldButton);

        buttonsContainer.position.set(
            Global.WIDTH / 2,
            (Global.HEIGHT - buttonsContainer.height) / 2);
        this.addChild(buttonsContainer);
    }

    // Private
    _onNormalFieldButtonClicked(e) {
        this._logic.signalStartGameNeeded(10, 22);
    }

    _onBigFieldButtonClicked(e) {
        this._logic.signalStartGameNeeded(15, 33);
    }
}
