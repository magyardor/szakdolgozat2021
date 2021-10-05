const express = require("express");
const multer = require("multer");

const News = require("../../models/pages/news");
const checkAuth = require("../../middleware/authMiddleware");

const router = express.Router();
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
    callback(error, "backend/images/news");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post("", multer({storage: storage}).single("image"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const news = new News({
    title: req.body.title,
    description: req.body.description,
    imagePath: url + "/images/" + req.file.filename
  });
  console.log(news);
  news.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "News added successfully",
      news: {
        ...result,
        id: result._id
      }
    });
  });
});

router.put("/:id", multer({storage: storage}).single("image"), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const news = new News({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    imagePath: imagePath
  });
  console.log(news);
  News.updateOne({_id: req.params.id}, news).then(result => {
    res.status(200).json(
      {message: "Update succsessful!"}
    );
  });
});

router.get("", (req, res, next) => {
  /* const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page; */
  News.find()
  /* let fetchNews;
  if(pageSize && currentPage) {
    newsQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  newsQuery.then(documents => {
    fetchNews = documents;
    return News.count();
  })*/
  .then(count => {
    res.status(200).json({
      message: "News fetched successfully!",
      news: count,
    });
  });
});

router.get("/:id", (req, res, next) => {
  News.findById(req.params.id).then(news => {
    if(news) {
      res.status(200).json(news);
    }
    else{
      res.status(404).json({message: "News not found!"});
    }
  });
});

router.delete("/:id",
  (req, res, next) => {
  News.deleteOne({_id: req.params.id}).then( result => {
    res.status(200).json({
      message: "News deleted!"
    });
  });
});


module.exports = router;
