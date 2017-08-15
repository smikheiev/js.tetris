import Connector from '../../utils/connector'
import Global from '../../const/global'
import * as PIXI from 'pixi.js'

export default class PreloaderScene extends PIXI.Container {
    constructor(preloaderViewLogic) {
        super();

        this._viewLogic = preloaderViewLogic;
        this._viewModel = preloaderViewLogic.viewModel;

        let style = {
            fontFamily: 'Verdana',
            fontSize: 22,
            fill: 'white'
        }

        let loadingText = new PIXI.Text('Loading...', style);
        loadingText.anchor.set(0.5, 0.5);
        loadingText.position.set(Global.WIDTH / 2, Global.HEIGHT / 2);
        this.addChild(loadingText);

        this._percentText = new PIXI.Text('', style);
        this._percentText.anchor.set(0, 0.5);
        this._percentText.position.set(loadingText.x + loadingText.width / 2 + 5, loadingText.y);
        this.addChild(this._percentText);

        Connector.connect(this._viewModel, this._viewModel.signalPercentLoadedChanged,
            this, this._slotOnPercentLoadedChanged);
    }

    // Private slots
    _slotOnPercentLoadedChanged() {
        this._percentText.text = this._viewModel.percentLoaded + ' %';
        console.log(this._viewModel.percentLoaded, this._percentText.text);
    }
}
