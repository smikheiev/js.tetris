import WhiteFrame from '../../../uicomponents/whiteframe'
import TextHelpers from '../../../helpers/texthelpers'
import Global from '../../../const/global'
import * as PIXI from 'pixi.js'

export default class Score extends PIXI.Container {
    constructor() {
        super();

        let frame = new WhiteFrame();
        let container = new PIXI.Container();

        let titleText = new PIXI.Text('YOUR SCORE', TextHelpers.getTextStyle(16));
        let scoreValueText = new PIXI.Text('888888888', TextHelpers.getTextStyle(22));

        titleText.position.set((scoreValueText.width - titleText.width) >> 1, 0);
        scoreValueText.position.set(0, titleText.height + 5);

        container.addChild(titleText);
        container.addChild(scoreValueText);
        container.position.set(Global.UI_GAME_PADDING, Global.UI_GAME_PADDING);

        frame.setSize(
            container.width + Global.UI_GAME_PADDING * 2,
            container.height + Global.UI_GAME_PADDING * 2
        );

        this.addChild(frame);
        this.addChild(container);

        scoreValueText.text = '0';
        scoreValueText.position.x = ((container.width - scoreValueText.width) >> 1);
    }
}
