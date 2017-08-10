const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'tetris.js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: [
        { "pixi.js": "PIXI" }
    ]
};
