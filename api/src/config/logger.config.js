module.exports = {
  levels: {
    development: 'all',
    test: 'debug',
    production: 'info'
  },
  config: {
    appenders: {
      stdout: {
        type: 'stdout',
        layout: {
          type: 'coloured'
        }
      },
      api: {
        type: 'file',
        filename: 'logs/api.log'
      }
    },
    categories: {
      default: {
        appenders: ['stdout'],
        level: 'info'
      },
      server: {
        appenders: ['stdout', 'api'],
        level: 'info'
      },
      api: {
        appenders: ['stdout', 'api'],
        level: 'debug'
      }
    }
  }
};
