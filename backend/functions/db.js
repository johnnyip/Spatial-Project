const pg = require('pg');
// load env from docker environments
require('dotenv').config();

// const connectionString = process.env.DATABASE_URL;
const dbURL = (process.env.CONNECTION_STRING !== undefined) ? process.env.CONNECTION_STRING : `postgres://ust:USTust123!@johnnyip.com:5434/test-geo`;
const connectionString = dbURL;
const client = new pg.Client(connectionString);

(async () => {
  await client.connect();
})();

module.exports = client;
