const express = require("express");
const NewsController = require("../../controllers/news");

const checkAuth = require("../../middleware/authMiddleware");
const img = require("../../middleware/imgNews");

const router = express.Router();

router.post("",
  checkAuth,
  img,
  NewsController.postNews
);

router.put("/:id",
  checkAuth,
  img,
  NewsController.putNews
);

router.get("",
  NewsController.getNews
);

router.get("/:id",
  NewsController.getNewsID
);

router.delete("/:id",
  checkAuth,
  NewsController.deleteNews
);


module.exports = router;
