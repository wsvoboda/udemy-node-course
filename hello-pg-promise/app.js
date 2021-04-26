const pgp = require("pg-promise")();
const connectionString =
  "postgres://postgres:Americ@@localhost:5432/nailasgarden";
const db = pgp(connectionString);

// console.log(db); // if this gives you a database object, it is connected correctly

// db.none("INSERT INTO dishes(name,course,price,imageURL) VALUES($1,$2,$3,$4)", [
//   "Chicken Sandwich",
//   "Entrees",
//   6.5,
//   "chickensandwich.png",
// ])
//   .then(() => {
//     console.log("SUCCESS");
//   })
//   .catch((error) => console.log(error));

db.one(
  "INSERT INTO dishes(name,course,price,imageURL) VALUES($1,$2,$3,$4) RETURNING dishid",
  ["Burger", "Entrees", 10.5, "burger.png"]
)
  .then((data) => {
    console.log(data.dishid);
  })
  .catch((error) => console.log(error));
