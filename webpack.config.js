const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const jquery = require("jquery");

const devServer = (isDev) => !isDev ? {} : {
    devServer: {
        open: true,
        hot: true,
        port: 7777,
    }
};

module.exports = ({develop}) => ({
    mode: develop ? 'development' : 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'business.html',
            template: './src/business.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'about-us.html',
            template: './src/about-us.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'prices.html',
            template: './src/prices.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'place-an-order.html',
            template: './src/place-an-order.html'
        }),
        new MiniCssExtractPlugin({
            filename: './styles/main.css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        })
    ],

    module: {
        rules: [
            {
                test: /\.(svg)$/i,
                type: "asset/inline",
            },
            {
                test: /\.(?:ico|jpe?g|png|gif)$/i,
                type: "asset/resource",
                // use: [
                //     {
                //         loader: 'file-loader',
                //         options: {
                //             name: '[name].[ext]',
                //             outputPath: 'images/',
                //         },
                //     },
                // ],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/inline',
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            }
        ]
    },
    ...devServer(develop),
});