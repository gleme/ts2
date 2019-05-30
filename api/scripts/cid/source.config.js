const username = process.env.SOURCE_MONGODB_USERNAME;
const password = process.env.SOURCE_MONGODB_PASSWORD;
const database = process.env.SOURCE_MONGODB_DATABASE;
const authDb = process.env.SOURCE_MONGODB_AUTHDB || 'admin';
const host = process.env.SOURCE_MONGODB_HOST || 'localhost';
const port = process.env.SOURCE_MONGODB_PORT || 27017;
const URI = process.env.SOURCE_MONGODB_URI || getURI;

function getURI() {
  return `mongodb://${username}:${password}@${host}:${port}/${database}`;
}

module.exports = {
  getURI,
  username,
  database,
  authDb,
  host,
  port,
  URI
};
