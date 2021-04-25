const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.get("/movies", (req, res) => {
  res.send("Movies!");
});

// {title: "Lord of the Rings", year: 2013}

app.post("/movies", (req, res) => {
  let title = req.body.title;
  let year = req.body.year;
  let revenue = req.body.revenue;
  console.log(title);
  console.log(year);
  console.log(revenue);
  res.send("OK");
});

// app.get("/movies", (req, res) => {
//   let movies = [
//     {
//       title: "Lord of the Rings",
//       year: 2014,
//     },
//     {
//       title: "Spiderman",
//       year: 2018,
//     },
//     {
//       title: "Black Sheep",
//       year: 1997,
//     },
//   ];

//   let movie = {
//     title: "Lord of the Rings",
//     year: 2014,
//   };
//   res.json(movies); // shows all movies in the array
// });

// app.get("/movies", (req, res) => {
//   console.log(req.query.sort);
//   console.log(req.query.page);
//   res.send("[Movies]");
// });

// app.get("/movies/:genre/year/:year", (req, res) => {
//   console.log(req.params.genre); // comes from URL the user puts in
//   console.log(req.params.year); // comes from URL the user puts in
//   res.send("Movies Route");
// });

// if your database of movies is very large and you want to sort by year, you will need to write a lot of routes. There is a better way to do it dynamically using route parameters (use : to write the dynamic parameters. ie :genre, :year, etc)

// app.get("/movies/comedy", (req, res) => {
//   res.send("Comedy Movies!");
// });

// app.get("/movies/romance", (req, res) => {
//   res.send("Romance Movies!");
// });

// app.get("/movies/action", (req, res) => {
//   res.send("Action Movies!");
// });

// app.get("/movies/year", (req, res) => {
//   res.send("Movies/Year");
// });

app.listen(PORT, () => {
  console.log(`Server is runnning on PORT ${PORT}`);
});
