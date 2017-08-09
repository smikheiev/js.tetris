import FieldLogic from './logic/fieldlogic'

export default class Tetris {
    constructor() {
        console.log('Make tetris great again!');

        let fieldLogic = new FieldLogic(8, 10);
    }
}
