const express = require("express");
const messageController = require("../../controllers/messages");
const checkAuth = require("../../middleware/authMiddleware");
const img = require("../../middleware/imgProducts");

const router = express.Router();

router.post("",
  img,
  messageController.postMessages
);

router.get("",
  checkAuth,
  messageController.getMessages
);

router.delete("/:id",
  checkAuth,
  messageController.deleteMessages
);

module.exports = router;
