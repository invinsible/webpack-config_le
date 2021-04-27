const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const devMode = process.env.NODE_ENV !== 'production';
console.log(devMode);

const filename = ext =>  devMode ? `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    resolve: {
        extensions: ['.js'],
        alias: {
            '@scripts': path.resolve(__dirname, 'src/js'), 
            '@styles' : path.resolve(__dirname, 'src/css'),
            '@'       : path.resolve(__dirname, 'src')          
        }
    },    
    entry:  './index.js',
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Less less less',
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }), 
        new Dotenv(),
        new VueLoaderPlugin()
    ],
    devServer: {
        port: 8080       
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: ['@babel/preset-env']
                    }
                }
            },            
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        minimize: !devMode,
        minimizer: [            
            new CssMinimizerPlugin(),
          ],
    }
}