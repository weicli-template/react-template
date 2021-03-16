const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');


module.exports = {
    output: {
        path: path.resolve(__dirname,'../', 'dist'),
        publicPath: '/',
        filename: '[name].[hash].js' // hash 项目相关整个项目一样 chunkhash 入口文件相关 cotentHash文件相关
    }, //chunkHash , contentHash 和 热更新冲突，不能同时使用
    resolve: {
        extensions: ['.ts', '.tsx','.js', '.jsx'],
        plugins: [
            new TsConfigPathsPlugin({
                configFile: path.join(__dirname, '../','tsconfig.json')
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.ts(x?)/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader'
                }
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader', //绝对路径原名引入，js和css中本地打包没问题，名字加入哈希值直接引入，js不会打包成哈希值
                        options: { //js里不能绝对路径引入，必须import或者require不然不会走loader， css里绝对路径引入
                            limit: 10000,
                            name: '[name].[hash:6].[ext]', //哈希值解决图片缓存问题
                            outputPath: 'images',
                            esModule: false
                            // publicPath: '/images'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin()
    ]

}
