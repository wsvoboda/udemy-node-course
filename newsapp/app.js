const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const pgp = require("pg-promise")();
const session = require("express-session");
const path = require("path");
const userRoutes = require("./routes/users");
const indexRoutes = require("./routes/index");
const checkAuthorization = require("./utils/authorization");
const CONNECTION_STRING = "postgres://postgres:Americ@@localhost:5432/newsdb";
const PORT = 3000;

const VIEWS_PATH = path.join(__dirname, "/views");

app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"));
app.set("views", VIEWS_PATH);
app.set("view engine", "mustache");

app.use("/css", express.static("css"));
app.use(
  session({
    secret: "abcdefg",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.locals.authenticated = req.session.user == null ? false : true;
  next();
});

db = pgp(CONNECTION_STRING);
app.use("/", indexRoutes);
app.use("/users", checkAuthorization, userRoutes);

app.listen(PORT, () => {
  console.log(`Server has started on ${PORT}`);
});
