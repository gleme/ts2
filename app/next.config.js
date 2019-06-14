/* eslint-disable */
const withCss = require('@zeit/next-css');

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {};
}

module.exports = () => {
  return withCss({
    webpackDevMiddleware: config => {
      // Solve compiling problem via vagrant
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300 // delay before rebuilding
      };
      return config;
    }
  });
};
