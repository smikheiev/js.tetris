import BlockType from '../../../../const/blocktype'
import BaseBlock from './baseblock'

export default class BlockJ extends BaseBlock {
    constructor() {
        let matrices = [
            [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0]
            ],
            [
                [0, 1, 1],
                [0, 1, 0],
                [0, 1, 0]
            ],
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 1]
            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0]
            ]
        ]

        super(BlockType.J, matrices);
    }
}
