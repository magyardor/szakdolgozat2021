const News = require("../models/pages/news");

exports.postNews = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const news = new News({
    title: req.body.title,
    description: req.body.description,
    imagePath: url + "/images/news/" + req.file.filename,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });
  news.save().then(result => {
    res.status(201).json({
      message: "News added successfully",
      news: {
        ...result,
        id: result._id
      }
    });
  });
}

exports.putNews = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/news/" + req.file.filename
  }
  const news = new News({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    imagePath: imagePath,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });
  News.updateOne({_id: req.params.id}, news).then(result => {
    res.status(200).json(
      {message: "Update successful!"}
    );
  });
}

exports.getNews = (req, res, next) => {
  News.find()
  .then(count => {
    res.status(200).json({
      message: "News fetched successfully!",
      news: count,
    });
  });
}

exports.getNewsID = (req, res, next) => {
  News.findById(req.params.id).then(news => {
    if(news) {
      res.status(200).json(news);
    }
    else{
      res.status(404).json({message: "News not found!"});
    }
  });
}

exports.deleteNews = (req, res, next) => {
  News.deleteOne({_id: req.params.id}).then( result => {
    res.status(200).json({
      message: "News deleted!"
    });
  });
}
