const express = require("express");
const app = express();
const PORT = 3000;
app.use(log);

// middleware function
function log(req, res, next) {
  console.log("[Logged]");
  console.log("[Logging Code 1]");
  console.log("[Logging Code 2]");
  console.log("[Logging Code 3]");
  next();
}

app.get("/", (req, res) => {
  res.send("ROOT");
});

app.get("/login", (req, res) => {
  res.send("LOGIN");
});

// app.get("/", log, (req, res) => {
//   res.send("ROOT");
// });

// app.get("/login", log, (req, res) => {
//   res.send("LOGIN");
// });

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}...`);
});
