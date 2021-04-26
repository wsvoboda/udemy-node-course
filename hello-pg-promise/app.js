const pgp = require("pg-promise")();
const connectionString = "postgres://localhost:5432/nailasgarden";
const db = pgp(connectionString);

console.log(db); // if this gives you a database object, it is connected correctly
