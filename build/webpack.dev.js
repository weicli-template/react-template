const path = require('path');
const marge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const manifest = require('./dist/vendors.manifest.json');

const devConfig = {
    mode: 'development',
    entry: {
        cms_admin: [
        'react-hot-loader/patch',
        './src/index.tsx'
        ]
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: '8888',
        // hotOnly: true, //页面不刷新 一般不需要此选项
        publicPath: '/', // 局部热更新，必须加
        hot: true, //局部热更新，必须加！！！
        disableHostCheck: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                changeOrigin: true,
                // pathRewrite: {'^/api': ''},
                secure: false,
                //  target: 'http://10.138.228.199:31605/mockjsdata/38',
            }
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),//生产禁用,开发热更新
        new HtmlWebpackPlugin({
            template: './build/template/index.html',
            // vendor: manifest.name + '.js',
        }),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest
        // })
    ]
}

module.exports = marge(devConfig, commonConfig);