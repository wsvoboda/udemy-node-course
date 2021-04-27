const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const pgp = require("pg-promise")();
const bcrypt = require("bcrypt");
const CONNECTION_STRING = "postgres://postgres:Americ@@localhost:5432/newsdb";
const PORT = 3000;
const SALT_ROUNDS = 10;

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");
app.use(bodyParser.urlencoded({ extended: false }));

const db = pgp(CONNECTION_STRING);

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  db.oneOrNone(
    "SELECT userid, username, password FROM users WHERE username = $1",
    [username]
  ).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (error, result) {
        if (result) {
          res.send("SUCCESS!");
        } else {
          res.render("login", { message: "Invalid username or password" });
        }
      });
    } else {
      res.render("login", { message: "Invalid username or password" });
    }
  });
});

app.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  db.oneOrNone("SELECT userid FROM users WHERE username = $1", [username]).then(
    (user) => {
      if (user) {
        res.render("register", { message: "Username already exists!" });
      } else {
        bcrypt.hash(password, SALT_ROUNDS, function (error, hash) {
          if (error == null) {
            db.none("INSERT INTO users(username, password) VALUES($1, $2)", [
              username,
              hash,
            ]).then(() => {
              res.send("SUCCESS");
            });
          }
        });
      }
    }
  );
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.listen(PORT, () => {
  console.log(`Server has started on ${PORT}`);
});
