import TextHelpers from '../../helpers/texthelpers'
import Connector from '../../utils/connector'
import Global from '../../const/global'
import * as PIXI from 'pixi.js'

export default class PreloaderScene extends PIXI.Container {
    constructor(preloaderViewLogic) {
        super();

        this._viewLogic = preloaderViewLogic;
        this._viewModel = preloaderViewLogic.viewModel;

        let container = new PIXI.Container();

        let loadingText = new PIXI.Text('Loading...', TextHelpers.getTextStyle(22));

        this._percentText = new PIXI.Text('100%', TextHelpers.getTextStyle(22));
        this._percentText.position.set(loadingText.x + loadingText.width + 5, 0);

        container.addChild(loadingText);
        container.addChild(this._percentText);
        container.position.set(
            (Global.WIDTH - container.width) >> 1,
            (Global.HEIGHT - container.height) >> 1
        )

        this.addChild(container);

        this._percentText.text = '';

        Connector.connect(this._viewModel, this._viewModel.signalPercentLoadedChanged,
            this, this._slotOnPercentLoadedChanged);
    }

    // Private slots
    _slotOnPercentLoadedChanged() {
        this._percentText.text = this._viewModel.percentLoaded + '%';
        console.log(this._viewModel.percentLoaded, this._percentText.text);
    }
}
