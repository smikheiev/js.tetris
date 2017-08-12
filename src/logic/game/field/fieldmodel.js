import BlockType from '../../../const/blocktype'

export default class FieldModel {
    constructor() {
        this._cells = new Array();

        this._sizeChangedHandler = undefined;
        this._cellChangedHandler = undefined;
        this._rowRemovedHandler = undefined;
    }

    // Signals
    signalSizeChanged() {
        if (this._sizeChangedHandler) {
            this._sizeChangedHandler();
        }
    }

    signalCellChanged(x, y) {
        if (this._cellChangedHandler) {
            this._cellChangedHandler(x, y);
        }
    }

    signalRowRemoved(y) {
        if (this._rowRemovedHandler) {
            this._rowRemovedHandler(y);
        }
    }

    // Public

    get width() { return this._width; }
    get height() { return this._height; }

    set sizeChangedHandler(fn) { this._sizeChangedHandler = fn; }
    set cellChangedHandler(fn) { this._cellChangedHandler = fn; }
    set rowRemovedHandler(fn) { this._rowRemovedHandler = fn; }

    setSize(width, height) {
        if (this._width !== width || this._height !== height) {
            this._width = width;
            this._height = height;

            this._resizeCellsMatrix();

            this.signalSizeChanged();
        }
    }

    getCell(x, y) {
        if (!this._isCellPositionOk(x, y)) {
            return undefined;
        }
        return this._cells[x][y];
    }

    setCell(x, y, value) {
        if (!this._isCellPositionOk(x, y)) {
            return;
        }

        if (this._cells[x][y] != value) {
            this._cells[x][y] = value;

            this.signalCellChanged(x, y);
        }
    }

    isCellBusy(x, y) {
        let cellValue = this.getCell(x, y);
        return (cellValue !== undefined && cellValue !== null);
    }

    clearRow(y) {
        if (y >= 0 && y < this._height) {
            for (let x = 0; x < this._width; ++x) {
                this._cells[x][y] = null;
            }

            this.signalRowRemoved(y);
        }
    }

    // Private

    _resizeCellsMatrix() {
        this._cells.length = this._width;
        for (let x = 0; x < this._width; ++x) {
            let column = this._cells[x];
            if (column === undefined) {
                column = new Array(this._height);
                this._cells[x] = column;
            } else {
                column.length = this._height;
            }
        }
    }

    _isCellPositionOk(x, y) {
        return (x >= 0 && x < this._width && y >= 0 && y < this._height);
    }
}
