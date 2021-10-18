const { merge } = require('webpack-merge');
const ModuleFederationPlugin  = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

// Set up this env variable in CI/CD pipeline
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production', // webkpack will make sure our JS files are optimized
    output: {
        filename: '[name].[contenthash].js', // this ensures whenever we build some files for prod, all the files will use this format as a template for naming
        publicPath: '/container/latest/' // used any time you have some part of webpack that tries to refer to a file that has been built by webpack.  Eg. HtmlPlugin trying to access some JS file that's been created
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
                auth: `auth@${domain}/auth/latest/remoteEntry.js`,
                dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`,
            },
            shared: packageJson.dependencies
        })
    ],
    stats: {
        children: true
    }
};

module.exports = merge(commonConfig, prodConfig);