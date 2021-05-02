const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const models = require("../models");

const SALT_ROUNDS = 10;

router.post("/add-comment", async (req, res) => {
  let productId = parseInt(req.body.productId);
  let title = req.body.title;
  let description = req.body.description;
  let comment = models.Comment.build({
    title: title,
    description: description,
    productId: productId,
  });
  let savedComment = await comment.save();
  if (savedComment) {
    res.redirect(`/products/${productId}`);
  } else {
    res.render("product-details", { message: "Error adding comment" });
  }
});

router.get("/products/:productId", async (req, res) => {
  const productId = req.params.productId;
  const product = await models.Product.findOne({
    include: [
      {
        model: models.Comment,
        as: "comments",
      },
    ],
    where: {
      id: productId,
    },
  });
  res.render("product-details", product.dataValues);
});

router.get("/", async (req, res) => {
  let products = await models.Product.findAll();
  res.render("index", { products: products });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let user = await models.User.findOne({
    where: {
      username: username,
    },
  });
  if (user != null) {
    bcrypt.compare(password, user.password, (error, result) => {
      if (result) {
        if (req.session) {
          req.session.user = { userId: user.id };
          res.redirect("/users/products");
        }
      } else {
        res.render("login", { message: "Incorrect Username or Password" });
      }
    });
  } else {
    res.render("login", { message: "Incorrect Username or Password" });
  }
});

router.post("/register", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let persistedUser = await models.User.findOne({
    where: { username: username },
  });
  if (persistedUser == null) {
    bcrypt.hash(password, SALT_ROUNDS, async (error, hash) => {
      if (error) {
        res.render("register", { message: "Error creating user!" });
      } else {
        let user = models.User.build({
          username: username,
          password: hash,
        });
        let savedUser = await user.save();
        if (savedUser != null) {
          res.redirect("/login");
        } else {
          res.render("register", { message: "User already exists!" });
        }
      }
    });
  } else {
    res.render("register", { message: "User already exists!" });
  }
});

module.exports = router;
