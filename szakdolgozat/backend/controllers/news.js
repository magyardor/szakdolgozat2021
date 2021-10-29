const News = require("../models/pages/news");

exports.postNews = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const news = new News({
    title: req.body.title,
    description: req.body.description,
    imagePath: url + "/images/news/" + req.file.filename
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
    imagePath: req.body.imagePath
  });
  console.log(news);
  News.updateOne({_id: req.params.id}, news).then(result => {
    res.status(200).json(
      {message: "Update succsessful!"}
    );
  });
}

exports.getNews = (req, res, next) => {
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
