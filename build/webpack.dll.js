const webpack = require('webpack');
const path = require('path');

const dllConfig = {
    mode: 'none',
    entry: {
        vendors: [
            'axios',
            'react',
            'react-dom',
            'react-router',
        ]
    },
    output: {
        filename: '[name].[chunkhash:6].dll.js',
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]'
    }, 
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.resolve(__dirname, 'dist/[name].manifest.json')
        })
    ]
}

module.exports = dllConfig;