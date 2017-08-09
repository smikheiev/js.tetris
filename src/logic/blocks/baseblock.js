export default class BaseBlock {
    constructor(blockType, matrices) {
        if (new.target === BaseBlock) {
            throw new Error('Can not create instance of abstract class "BaseBlock"');
        }

        this._blockType = blockType;
        this._matrices = matrices;

        this._rotationsCount = matrices.length;
        this._currentMatrix = matrices[0];
        this._currentRotation = 0;

        this._fieldPositionX = 0;
        this._fieldPositionY = 0;
    }

    // Public

    get blockType() { return this._blockType; }
    get width() { return this._currentMatrix.length; }
    get height() { return this._currentMatrix[0].length; }

    get fieldPositionX() { return this._fieldPositionX; }
    set fieldPositionX(value) { this._fieldPositionX = value; }

    get fieldPositionY() { return this._fieldPositionY; }
    set fieldPositionY(value) { this._fieldPositionY = value; }

    isCellBusy(x, y) {
        if (!this._isCellPositionOk(x, y)) {
            return undefined;
        }
        return this._currentMatrix[x][y] !== 0;
    }

    rotate() {
        this._currentRotation = (this._currentRotation + 1) % this._rotationsCount;
        this._currentMatrix = this._matrices[this._currentRotation];
    }

    rotateBack() {
        this._currentRotation = (this._currentMatrix - 1 + this._rotationsCount) % this._rotationsCount;
        this._currentMatrix = this._matrices[this._currentRotation];
    }

    // Private

    _isCellPositionOk(x, y) {
        return (x >= 0 && x < this.width  && y >= 0 && y < this.height);
    }
}
