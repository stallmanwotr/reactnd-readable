const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(common, {
    devtool: 'inline-source-map',

    devServer: {
        contentBase: '/',
        historyApiFallback: {
            index: '/',
            verbose: true,
            disableDotRule: true
        },
        hot: true
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        rules: [{
            test: /\.jsx$/, use: 'react-hot-loader'
        }]
    }
});

