const log4js = require('log4js');
const { env } = require('../config/api.config');
const { config, levels } = require('../config/logger.config');

// configure logger
log4js.configure(config);

function getLogger(category) {
  const logger = log4js.getLogger(category);
  logger.level = levels[env];
  return logger;
}

module.exports = {
  getLogger: getLogger
};
