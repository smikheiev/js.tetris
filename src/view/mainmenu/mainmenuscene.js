import SimpleButton from '../../uicomponents/simplebutton'
import Global from '../../const/global'
import * as PIXI from 'pixi.js'

export default class MainMenuScene extends PIXI.Container {
    constructor(mainMenuViewLogic) {
        super();

        this._viewLogic = mainMenuViewLogic;
        this._viewModel = mainMenuViewLogic.viewModel;

        let buttonsContainer = new PIXI.Container();

        let normalFieldButton = new SimpleButton();
        normalFieldButton.set({
            text: 'Normal field', width: 220, height: 44, fontSize: 28
        });
        normalFieldButton.position.set(0, 0);
        normalFieldButton.on("mouseup", this._onNormalFieldButtonClicked.bind(this));

        let bigFieldButton = new SimpleButton();
        bigFieldButton.set({
            text: 'Big field', width: 220, height: 44, fontSize: 28
        });
        bigFieldButton.position.set(0, normalFieldButton.height + 15);
        bigFieldButton.on("mouseup", this._onBigFieldButtonClicked.bind(this));

        buttonsContainer.addChild(normalFieldButton);
        buttonsContainer.addChild(bigFieldButton);
        buttonsContainer.position.set(
            (Global.WIDTH - buttonsContainer.width) >> 1,
            (Global.HEIGHT - buttonsContainer.height) >> 1);

        this.addChild(buttonsContainer);
    }

    // Private
    _onNormalFieldButtonClicked(e) {
        this._viewLogic.signalStartGameNeeded(10, 22);
    }

    _onBigFieldButtonClicked(e) {
        this._viewLogic.signalStartGameNeeded(15, 33);
    }
}
