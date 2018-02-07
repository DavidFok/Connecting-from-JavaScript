const settings = require("./settings");
const moment = require('moment');
const knex = require('knex')({
  client: 'pg',
  version: 7.2,
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const srchTerm = process.argv[2];

knex.select('*')
  .from('famous_people')
  .where('first_name', 'LIKE', srchTerm)
  .orWhere('last_name', 'LIKE', srchTerm)
  .asCallback((err, result) => {
    console.log(`Searching ...`);
    // console.log(result.length);
    console.log(`Found ${result.length} person(s) by the name ${srchTerm}:`);
    result.forEach((val) => {
      console.log(`- ${val.id}: ${val.first_name} ${val.last_name}, born '${moment(val.birthdate).format('YYYY MM DD')}'`);
    });
    knex.destroy();
  });