const pg = require('pg');
const connectionString = 'postgres://ust:USTust123!@johnnyip.com:5434/test-geo';
const client = new pg.Client(connectionString);

(async () => {
  await client.connect();
})();

module.exports = client;
