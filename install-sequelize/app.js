const models = require("./models");

// creating and returning added information using Sequelize

// let dish = models.Dish.build({
//   name: "Spring Rolls",
//   description: "Delicious egg spring rolls",
//   price: 3.75,
// });

// dish.save().then((persistedDish) => {
//   console.log(persistedDish);
// });

// finding information in the model

// models.Dish.findAll().then((dishes) => console.log(dishes));

// models.Dish.findByPk(3).then((dish) => {
//   console.log(dish);
// });

// models.Dish.findAll({ where: { name: "Spring Rolls" } }).then((dish) => {
//   console.log(dish);
// });

// models.Dish.findOne({ where: { name: "Spring Rolls" } }).then((dish) =>
//   console.log(dish)
// );

// update to dish. Be sure to add a "where" input or everything will change

// models.Dish.update(
//   { name: "Carrot Cake", price: 8.0 },
//   { where: { id: 2 } }
// ).then((updatedDish) => console.log(updatedDish));

// delete dish. Always use id to delete something from model.

// models.Dish.destroy({ where: { id: 3 } }).then((result) => console.log(result));
