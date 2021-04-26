const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const userRoutes = require("./routes/users");
const mustacheExpress = require("mustache-express");
const session = require("express-session");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
); // saveUninitialized saves cookies
const VIEWS_PATH = path.join(__dirname, "/views");
app.use(express.urlencoded({ extended: false })); // allows you to read the body (pull info from inputs on page)
app.use("/users", userRoutes);
// app.use("/users", authenticate, userRoutes); // do this if you want the user to be created in order to access any page of the site
app.use("/css", express.static("css"));
app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"));
app.set("views", VIEWS_PATH);
app.set("view engine", "mustache");

// app.get("/", (req, res) => {
//   let user = {
//     name: "John Doe",
//     address: {
//       street: "789 Street",
//       city: "Houston",
//       state: "TX",
//     },
//   };
//   res.render("index", user);
// });

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
