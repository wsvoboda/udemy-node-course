const express = require("express");
const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

let uniqueFileName = "";

router.get("/add-product", (req, res) => {
  res.render("users/add-product");
});

function uploadFile(req, callback) {
  new formidable.IncomingForm()
    .parse(req)
    .on("fileBegin", (name, file) => {
      uniqueFileName = `${uuidv4()}.${file.name.split(".").pop()}`;
      file.name = uniqueFileName;
      file.path = __basedir + "/uploads/" + file.name;
    })
    .on("file", (name, file) => {
      callback(file.name);
    });
}

router.post("/upload", (req, res) => {
  uploadFile(req, (photoURL) => {
    photoURL = `/uploads/${photoURL}`;
    res.render("users/add-product", {
      imageURL: photoURL,
      className: "product-preview-image",
    });
  });
});

module.exports = router;
