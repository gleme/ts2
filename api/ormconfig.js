const path = require('path');

module.exports = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  logging: process.env.NODE_ENV === 'development',
  entities: path.resolve(process.env.TYPEORM_ENTITIES),
  dropSchema: false,
  maxQueryExecutionTime: process.env.TYPEORM_MAX_QUERY_EXECUTION_TIME
  // entityPrefix: 'ts2_',
};
