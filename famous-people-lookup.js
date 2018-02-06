const pg = require("pg");
const settings = require("./settings");
const moment = require('moment');

const client = new pg.Client({
  user      : settings.user,
  password  : settings.password,
  database  : settings.database,
  host      : settings.hostname,
  port      : settings.port,
  ssl       : settings.ssl
});

const srchTerm = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text", [srchTerm], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Searching ...`);
    console.log(`Found ${result.rows.length} person(s) by the name ${srchTerm}:`);
    result.rows.forEach((val) => {
      console.log(`- ${val.id}: ${val.first_name} ${val.last_name}, born '${moment(val.birthdate).format('YYYY MM DD')}'`);
    });
    client.end();
  });
});