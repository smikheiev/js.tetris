import FieldLogic from './field/fieldlogic'

export default class GameLogic {
    constructor() {
        this._fieldLogic = new FieldLogic();
    }

    // Public

    get fieldLogic() { return this._fieldLogic; }
}
