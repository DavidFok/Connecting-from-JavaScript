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

const firstName = process.argv[2];
const lastName = process.argv[3];
const dob = process.argv[4];

knex('famous_people')
  .insert({first_name: firstName,
           last_name: lastName,
           birthdate: dob})
  .asCallback(() => {
    knex.select('*').from('famous_people').asCallback((err, result) => {
      console.log(result);
      knex.destroy();
    });
})
