import BlockType from '../../const/blocktype'
import BlockI from './block_i'
import BlockJ from './block_j'
import BlockL from './block_l'
import BlockO from './block_o'
import BlockS from './block_s'
import BlockT from './block_t'
import BlockZ from './block_z'

export default class BlocksRepository {
    constructor() {
        this._blocks = new Map();
        this._blocks.set(BlockType.I, new BlockI());
        this._blocks.set(BlockType.J, new BlockJ());
        this._blocks.set(BlockType.L, new BlockL());
        this._blocks.set(BlockType.O, new BlockO());
        this._blocks.set(BlockType.S, new BlockS());
        this._blocks.set(BlockType.T, new BlockT());
        this._blocks.set(BlockType.Z, new BlockZ());

        this._blockTypes = Array.from(this._blocks.keys());

        this._blocksCount = this._blockTypes.length;
    }

    // Public
    getRandomBlock() {
        let rand = Math.floor(Math.random() * this._blocksCount);
        let blockType = this._blockTypes[rand];
        return this._blocks.get(blockType);
    }

    getBlockOfType(blockType) {
        return this._blocks.get(blockType);
    }
}
