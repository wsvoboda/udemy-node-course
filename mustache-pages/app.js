const express = require("express");
const app = express();
const path = require("path");
const mustacheExpress = require("mustache-express");
const userRoutes = require("./routes/users");
const PORT = 3000;
const VIEWS_PATH = path.join(__dirname, "/views");
app.use(express.urlencoded({ extended: false })); // allows you to read the body (pull info from inputs on page)
app.use("/users", userRoutes);
app.use("/css", express.static("css"));
app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"));
app.set("views", VIEWS_PATH);
app.set("view engine", "mustache");

app.get("/", (req, res) => {
  let user = {
    name: "John Doe",
    address: {
      street: "789 Street",
      city: "Houston",
      state: "TX",
    },
  };
  res.render("index", user);
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
