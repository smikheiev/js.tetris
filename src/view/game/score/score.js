import WhiteFrame from '../../../uicomponents/whiteframe'
import TextHelpers from '../../../helpers/texthelpers'
import Connector from '../../../utils/connector'
import Global from '../../../const/global'
import * as PIXI from 'pixi.js'

export default class Score extends PIXI.Container {
    constructor(scoreViewLogic) {
        super();

        this._viewLogic = scoreViewLogic;
        this._viewModel = scoreViewLogic.viewModel;

        let frame = new WhiteFrame();
        this._container = new PIXI.Container();

        let titleText = new PIXI.Text('YOUR SCORE', TextHelpers.getTextStyle(16));
        this._scoreValueText = new PIXI.Text('888888888', TextHelpers.getTextStyle(22));

        titleText.position.set((this._scoreValueText.width - titleText.width) >> 1, 0);
        this._scoreValueText.position.set(0, titleText.height + 5);

        this._container.addChild(titleText);
        this._container.addChild(this._scoreValueText);
        this._container.position.set(Global.UI_GAME_PADDING, Global.UI_GAME_PADDING);

        frame.setSize(
            this._container.width + Global.UI_GAME_PADDING * 2,
            this._container.height + Global.UI_GAME_PADDING * 2
        );

        this.addChild(frame);
        this.addChild(this._container);

        this._scoreValueText.text = '0';
        this._updateScoreValueTextPosition();

        Connector.connect(this._viewModel, this._viewModel.signalScoreChanged,
            this, this._slotOnScoreChanged);
    }

    // Private slots
    _slotOnScoreChanged() {
        this._scoreValueText.text = '' + this._viewModel.score;
        this._updateScoreValueTextPosition();
    }

    // Private
    _updateScoreValueTextPosition() {
        this._scoreValueText.position.x = ((this._container.width - this._scoreValueText.width) >> 1);
    }
}
