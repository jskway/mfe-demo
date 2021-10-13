// Merge is a function we can use to merge together two different webpack config objects
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container', // the name for our host never really gets used for anything, this is just convention
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js' // keys are the different names of the modules we're going to import into our container
                                                                            // values are where the remoteEntry file is for that module
            },
            shared: packageJson.dependencies 
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};

module.exports = merge(commonConfig, devConfig);