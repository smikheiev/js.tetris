import FieldViewModel from './fieldviewmodel'

export default class FieldViewLogic {
    constructor() {
        this._viewModel = new FieldViewModel();

        this._currentBlock = undefined;
    }

    // Get/set
    get viewModel() { return this._viewModel; }

    // Public
    setCellValue(x, y, value) {
        this.viewModel.setCell(x, y, value);
    }

    clearCellValue(x, y) {
        this.viewModel.setCell(x, y, null);
    }

    // Public slots
    slotOnStartGameNeeded(fieldWidth, fieldHeight) {
        this._viewModel.setSize(fieldWidth, fieldHeight);
    }

    slotOnRemoveCell(x, y) {
        this._removeCell(x, y);
    }

    slotOnGameEnded() {
        for (let x = 0; x < this._viewModel.width; ++x) {
            for (let y = 0; y < this._viewModel.height; ++y) {
                this._removeCell(x, y);
            }
        }
    }

    // Private
    _removeCell(x, y) {
        this.viewModel.setCell(x, y, null);
    }
}
