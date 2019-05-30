/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT || 3000);

module.exports = Object.freeze({
  host: process.env.HOST || 'localhost',
  port: port,
  env: process.env.NODE_ENV || 'development'
});
