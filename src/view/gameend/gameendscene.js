import SimpleButton from '../../uicomponents/simplebutton'
import TextHelpers from '../../helpers/texthelpers'
import Global from '../../const/global'
import * as PIXI from 'pixi.js'

export default class GameEndScene extends PIXI.Container {
    constructor(gameEndViewLogic) {
        super();

        this._viewLogic = gameEndViewLogic;
        this._viewModel = gameEndViewLogic.viewModel;

        let container = new PIXI.Container();

        let gameEndText = new PIXI.Text("Game over!", TextHelpers.getTextStyle(64));
        gameEndText.position.set(0, 0);

        let backToMenuButton = new SimpleButton();
        backToMenuButton.set({
            text: 'Back to menu', width: 220, height: 44, fontSize: 28
        })
        backToMenuButton.position.set(
            (gameEndText.width - backToMenuButton.width) >> 1,
            gameEndText.height + 25
        );
        backToMenuButton.on("mouseup", this._onBackToMenuButtonClicked.bind(this));

        container.addChild(gameEndText);
        container.addChild(backToMenuButton);
        container.position.set(
            (Global.WIDTH - container.width) >> 1,
            (Global.HEIGHT - container.height) >> 1);

        this.addChild(container);
    }

    // Private
    _onBackToMenuButtonClicked(e) {
        this._viewLogic.signalBackToMainMenuNeeded();
    }
}
