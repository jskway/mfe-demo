// Merge is a function we can use to merge together two different webpack config objects
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'marketing', // this will be used to declare a global var when the script loads up inside the container
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap' // whenever someone asks for './Marketing', give them the bootstrap.js file
            },
            shared: packageJson.dependencies,
        })
    ]
};

module.exports = merge(commonConfig, devConfig);