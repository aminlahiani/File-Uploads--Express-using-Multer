const express = require("express");

const multer = require("multer");
const app = express();





const port = process.env.PORT || 3000


const uploadDoc = multer({
  dest: "doc",
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx|pdf)$/)) {
      return cb(new Error("Please upload a Word document"));
    }

    cb(undefined, true);
  },
});
app.post(
  "/doc",
  uploadDoc.single("upload"),
  (req, res) => {
    res.send("file uplodet");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

const uploadImage = multer({
  dest: "images",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

app.post(
  "/images",
  uploadImage.single("avatar"),
  (req, res) => {
    res.send("file uplodet");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);



app.listen(port,  () =>  console.log(`app listen en ${port}`));
