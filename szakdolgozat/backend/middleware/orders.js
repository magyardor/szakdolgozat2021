/*
Author: Maximilian Schwarzmüller
Github repo: https://github.com/PacktPublishing/Angular-and-Node.js---The-MEAN-Stack-Guide
Udemy video: https://www.udemy.com/course/angular-2-and-nodejs-the-practical-guide/
*/
const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid) {
      error = null;
    }
    callback(error, "backend/images/orders");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, name + "-" + Date.now() + "." + ext);
  }
});


module.exports = multer({storage: storage}).single("image");
