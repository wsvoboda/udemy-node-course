const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const path = require("path");
const models = require("./models");
const bcrypt = require("bcrypt");
const session = require("express-session");
const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/users");
const checkAuthorization = require("./middlewares/authorization");

const PORT = 3000;
const VIEWS_PATH = path.join(__dirname, "/views");

global.__basedir = __dirname;

app.use(session({ secret: "abcdefg", resave: true, saveUninitialized: false }));
app.use("/uploads", express.static("uploads"));
app.use("/css", express.static("css"));
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.locals.isAuthenticated = false;
  next();
});

app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"));
app.set("views", VIEWS_PATH);
app.set("view engine", "mustache");

app.use("/", indexRoutes);
app.use("/users", checkAuthorization, userRoutes);

app.listen(PORT, () =>
  console.log(`Server is running on localhost:${PORT}...`)
);
