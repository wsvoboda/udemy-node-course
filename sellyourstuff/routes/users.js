const express = require("express");
const router = express.Router();

router.get("/add-product", (req, res) => {
  res.render("users/add-product");
});

module.exports = router;
