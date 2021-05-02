const express = require("express");
const formidable = require("formidable");
const router = express.Router();

router.get("/add-product", (req, res) => {
  res.render("users/add-product");
});

function uploadFile(req, callback) {
  new formidable.IncomingForm()
    .parse(req)
    .on("fileBegin", (name, file) => {
      file.path = __basedir + "/uploads/" + file.name;
    })
    .on("file", (name, file) => {
      callback(file.name);
    });
}

router.post("/upload", (req, res) => {
  uploadFile(req, (photoURL) => {
    res.send("UPLOADED");
  });
});

module.exports = router;
