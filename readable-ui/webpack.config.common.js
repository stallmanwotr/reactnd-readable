const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        dist: './src/index.js'
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Readable',
            filename: 'index.html',
            template: './public/index.html'
        })
    ],

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react'],
                    plugins: ['babel-plugin-transform-class-properties']
                }
            },
            'eslint-loader'],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(jpe?g|gif|png|svg)$/,
            use: [{
                loader: 'file-loader'
            }]
        }]
    }
};
