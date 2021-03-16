const merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfig = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


const prodConfig = {
    mode: 'production',
    entry: {
        cms_admin: [
            './src/index.tsx'
        ]
    },
    module:{
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader, // css外链不能局部热更新了, 跟react-hot-loader不兼容
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "all",          //async异步代码分割 initial同步代码分割 all同步异步分割都开启
            minSize: 30000,         //字节 引入的文件大于30kb才进行分割
            //maxSize: 50000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
            minChunks: 1,           //模块至少使用次数
            maxAsyncRequests: 5,    //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
            maxInitialRequests: 3,  //首页加载的时候引入的文件最多3个
            automaticNameDelimiter: '~', //缓存组和生成文件名称之间的连接符
            name: true,                  //缓存组里面的filename生效，覆盖默认命名
            // cacheGroups: { //缓存组，将所有加载模块放在缓存里面一起分割打包
            //     vendors: {  //自定义打包模块
            //     test: /[\\/]node_modules[\\/]/,
            //     priority: -10, //优先级，先打包到哪个组里面，值越大，优先级越高
            //     filename: 'vendors.js',
            //     },
            //     default: { //默认打包模块
            //     priority: -20,
            //     reuseExistingChunk: true, //模块嵌套引入时，判断是否复用已经被打包的模块
            //     filename: 'common.js'
            //     }
            // }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({ //开发环境不使用mini-css-extract-plugin 不同的环境配置不同的loader
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: './build/template/index.html',
        }),
      new CleanWebpackPlugin(),

      // new BundleAnalyzerPlugin({
        //     //  可以是`server`，`static`或`disabled`。
        //     //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
        //     //  在“静态”模式下，会生成带有报告的单个HTML文件。
        //     //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
        //     analyzerMode: "server",
        //     //  将在“服务器”模式下使用的主机启动HTTP服务器。
        //     analyzerHost: "127.0.0.1",
        //     //  将在“服务器”模式下使用的端口启动HTTP服务器。
        //     analyzerPort: 8866,
        //     //  路径捆绑，将在`static`模式下生成的报告文件。
        //     //  相对于捆绑输出目录。
        //     reportFilename: "report.html",
        //     //  模块大小默认显示在报告中。
        //     //  应该是`stat`，`parsed`或者`gzip`中的一个。
        //     //  有关更多信息，请参见“定义”一节。
        //     defaultSizes: "parsed",
        //     //  在默认浏览器中自动打开报告
        //     openAnalyzer: true,
        //     //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
        //     generateStatsFile: false,
        //     //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
        //     //  相对于捆绑输出目录。
        //     statsFilename: "stats.json",
        //     //  stats.toJson（）方法的选项。
        //     //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
        //     //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
        //     statsOptions: null,
        //     logLevel: "info"}
        //   )
    ]
}

module.exports = merge(prodConfig, commonConfig);
