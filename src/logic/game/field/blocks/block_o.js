import BlockType from '../../../../const/blocktype'
import BaseBlock from './baseblock'

export default class BlockO extends BaseBlock {
    constructor() {
        let matrices = [
            [
                [1, 1],
                [1, 1]
            ]
        ]

        super(BlockType.O, matrices);
    }
}
