const { Client } = require('pg');
require('dotenv').config();

const url = process.env.DATABASE_URL;
console.log('Attempting PG connect to', url);
const client = new Client({ connectionString: url });

client.connect()
  .then(() => { console.log('PG connected'); return client.end(); })
  .catch(err => { console.error('PG error', err); process.exit(1); });
