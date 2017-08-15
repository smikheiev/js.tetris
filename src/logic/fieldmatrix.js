const FREE_CELL = 0;

export default class FieldMatrix {
    constructor(width, height) {
        this._width = width;
        this._height = height;

        this._matrix = new Array(width);
        for (let x = 0; x < width; ++x) {
            let column = new Array(height);
            this._matrix[x] = column;
            for (let y = 0; y < height; ++y) {
                column[y] = FREE_CELL;
            }
        }
    }

    // Get/set
    get width() { return this._width; }
    get height() { return this._height; }

    // Public
    isCellBusy(x, y) {
        let cellValue = this._getCellValue(x, y);
        return cellValue !== undefined && cellValue !== FREE_CELL;
    }

    setCellValue(x, y, value) {
        if (this._isCellCoordinatesOk(x, y)) {
            this._matrix[x][y] = value;
        }
    }

    setCellAsFree(x, y) {
        this.setCellValue(x, y, FREE_CELL);
    }

    moveCell(fromX, fromY, toX, toY) {
        let value = this._getCellValue(fromX, fromY);
        if (value === undefined) {
            return undefined;
        }
        this.setCellAsFree(fromX, fromY);
        this.setCellValue(toX, toY, value);
        return value;
    }

    // Private
    _isCellCoordinatesOk(x, y) {
        return (x >= 0 && x < this._width && y >= 0 && y < this._height);
    }

    _getCellValue(x, y) {
        if (this._isCellCoordinatesOk(x, y)) {
            return this._matrix[x][y];
        }
        return undefined;
    }
}
