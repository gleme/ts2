/* eslint-disable */
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
const webpack = require('webpack');
const { parsed: localEnv } = require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './node_modules/antd/dist/antd.less'), 'utf8')
);
// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
}

module.exports = () => {
  return withLess({
    webpack(config) {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
      return config;
    },
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables // make your antd custom effective
    }
  });
};
