import Global from '../../const/global'
import * as PIXI from 'pixi.js'

export default class GameEndScene extends PIXI.Container {
    constructor(gameEndViewLogic) {
        super();

        this._viewLogic = gameEndViewLogic;
        this._viewModel = gameEndViewLogic.viewModel;

        let container = new PIXI.Container();

        let gameEndText = new PIXI.Text("Game end", {
            fontFamily: 'Verdana',
            fontSize: 64,
            fill: 'white'
        });
        gameEndText.anchor.set(0.5, 0);
        gameEndText.position.set(0, 0);
        container.addChild(gameEndText);

        let backToMenuButton = new PIXI.Text("Back to menu", {
            fontFamily: 'Verdana',
            fontSize: 32,
            fill: 'white'
        });
        backToMenuButton.anchor.set(0.5, 0);
        backToMenuButton.position.set(0, gameEndText.height + 25);
        backToMenuButton.interactive = true;
        backToMenuButton.buttonMode = true;
        backToMenuButton.on("mouseup", this._onBackToMenuButtonClicked.bind(this));
        container.addChild(backToMenuButton);

        container.position.set(
            Global.WIDTH / 2,
            (Global.HEIGHT - container.height) / 2);
        this.addChild(container);
    }

    // Private
    _onBackToMenuButtonClicked(e) {
        this._viewLogic.signalBackToMainMenuNeeded();
    }
}
