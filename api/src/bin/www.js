/**
 * Load Environment Variables
 */
require('dotenv').config();
require('@babel/polyfill');
const util = require('util');
const { createConnection, getConnectionOptions } = require('typeorm');
const { MongoClient } = require('mongodb');
let { retry, parallel } = require('async');
const { port, env } = require('../config/api.config');
const mongoConfig = require('../config/mongo.config');
const app = require('../app');
const http = require('http');
const { getLogger } = require('../services/logger.service');
retry = util.promisify(retry);
parallel = util.promisify(parallel);

/**
 * Configure API Logger
 */
const logger = getLogger('api');

/**
 * Gracefully shutdown the process
 */
process.on('uncaughtException', () => {
  try {
    server.close();
  } catch (error) {
    throw error;
  }
});

process.on('SIGTERM', () => {
  try {
    app.locals.mysqlDb.close();
    server.close();
  } catch (error) {
    throw error;
  }
});

/**
 * Create HTTP server.
 */
app.set('port', port);
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.on('error', onError);
// server.on('listening', onListening);

(async () => {
  try {
    // connect to databases
    await parallel({
      mysql: async callback => {
        try {
          const pool = await createMySQLPool();
          const { type, host, port, database } = await getConnectionOptions();
          logger.info(`connected to database instance ${type}://${host}:${port}/${database}`);
          app.locals.mysqlDb = pool;
          callback();
        } catch (error) {
          callback(error);
        }
      },
      mongo: async callback => {
        try {
          const pool = await createMongoPool();
          const { host, database } = mongoConfig;
          logger.info(`connected to database instance mongodb://${host}/${database}`);
          app.locals.mongoDb = pool.db(database);
          callback();
        } catch (error) {
          callback(error);
        }
      }
    });

    // make server listen
    await server.listen(port);
    const addr = server.address();
    const bind = typeof addr === 'string' ? addr : addr.port;
    logger.info(`'stagiop-ts2-api' started on ${addr.address}:${bind} - environment: ${env}`);
  } catch (error) {
    logger.error(error);
    logger.fatal('exiting process');
    process.exit(1);
  }
})();

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      throw new Error(bind + ' requires elevated privileges');
    case 'EADDRINUSE':
      throw new Error(bind + ' is already in use');
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? addr : addr.port;
  logger.info(`'stagiop-ts2-api' started on ${addr.address}:${bind} - environment: ${env}`);
}

/**
 *  Create MongoDB Connection Pool
 */
async function createMongoPool() {
  try {
    const mongoClient = new MongoClient(mongoConfig.URI, { useNewUrlParser: true });
    const connectionPool = await retry({ times: 5, interval: 2000 }, async callback => {
      try {
        const connection = await mongoClient.connect();
        callback(null, connection);
      } catch (error) {
        const { errmsg, code, codeName } = error;
        if (code) {
          logger.error(`${code} - ${codeName} - ${errmsg}`);
        } else {
          logger.error(`mongodb error - ${error}`);
        }
        logger.error('retrying to connect to mongodb');
        callback(error);
      }
    });
    return connectionPool;
  } catch (error) {
    logger.fatal('cannot stablish connection to MongoDB database');
    throw error;
  }
}

/**
 * Create MySQL Database Connection Pool
 */
async function createMySQLPool() {
  try {
    const connectionPool = await retry({ times: 5, interval: 2000 }, async callback => {
      try {
        const conn = await createConnection();
        callback(null, conn);
      } catch (error) {
        const { code, errno, sqlMessage } = error;
        logger.error(`${errno} - ${code} - ${sqlMessage}`);
        logger.error('retrying to connect to mysql');
        callback(error);
      }
    });
    return connectionPool;
  } catch (error) {
    logger.fatal('cannot stablish connection to MySQL database');
    throw error;
  }
}
