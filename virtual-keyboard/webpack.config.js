const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        static: path.resolve(__dirname, './dist'),
        // { directory: path.join(__dirname, './dist'), },
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['.js', '.json'],
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            title: 'Virtual keyboard',
            template: path.resolve(__dirname, './src/template.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            // JavaScript.
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // Изображения.
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            // Шрифты и SVG.
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            // Стили CSS, PostCSS, Sass.
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            }
        ],
    },
}