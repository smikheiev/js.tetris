import GameLogic from './game/gamelogic'

export default class RootLogic {
    constructor() {
        this._gameLogic = new GameLogic();
    }

    // Public

    get gameLogic() { return this._gameLogic; }

    startGame(width, height) {
        this._gameLogic.startGame(width, height);
    }
}
