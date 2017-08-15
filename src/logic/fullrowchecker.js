export default class FullRowChecker {
    constructor (fieldMatrix) {
        this._fieldMatrix = fieldMatrix;
    }

    // Public
    getFullRows() {
        let fullRows = [];
        for (let y = this._fieldMatrix.height - 1; y >= 0; --y) {
            let isRowFull = true;
            for (let x = 0; x < this._fieldMatrix.width; ++x) {
                if (!this._fieldMatrix.isCellBusy(x, y)) {
                    isRowFull = false;
                    break;
                }
            }
            if (isRowFull) {
                fullRows.push(y);
            }
        }
        return fullRows;
    }
}
