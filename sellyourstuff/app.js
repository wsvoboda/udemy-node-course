const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const path = require("path");
const models = require("./models");
const bcrypt = require("bcrypt");
const session = require("express-session");
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/users");

const PORT = 3000;
const VIEWS_PATH = path.join(__dirname, "/views");

app.use(session({ secret: "abcdefg", resave: true, saveUninitialized: false }));
app.use(express.urlencoded({ extended: false }));

app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"));
app.set("views", VIEWS_PATH);
app.set("view engine", "mustache");

app.use("/", indexRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () =>
  console.log(`Server is running on localhost:${PORT}...`)
);
