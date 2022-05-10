const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
console.log('IS DEV:', isDev);
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config;
}

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        opts.presets.push(preset);
    }

    return opts;
}

// const jsLoaders = () => {
//     const loaders = [{
//         loader: 'babel-loader',
//         options: babelOptions()
//     }];

//     if (isDev) {
//         loaders.push('eslint-loader');
//     }

//     return loaders;
// }

module.exports = {
    mode: isProd ? 'production' : 'development',
    devtool: false,
    devServer: {
        historyApiFallback: true,
        static: path.resolve(__dirname, './dist'),
        // { directory: path.join(__dirname, './dist'), },
        open: true,
        compress: true,
        hot: isDev,
        port: 8080,
    },
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['.js', '.json'],
    },
    optimization: optimization(),
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            title: 'Virtual keyboard',
            template: path.resolve(__dirname, './src/template.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd,
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                // Copy favicon to dist.
                { 
                    from: path.resolve(__dirname, 'src/assets/images/favicon.ico'), 
                    to: path.resolve(__dirname, '../dist') 
                },
            ],
          }),
          new MiniCssExtractPlugin({
              filename: '[name].bundle.css',
          })
    ],
    module: {
        rules: [
            // JavaScript.
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: babelOptions()
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
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            // {
            //     test: /\.scss)$/,
            //     use: [MiniCssExtractPlugin.loader, "css-loader", "scss-loader"],
            // },
        ],
    },
}