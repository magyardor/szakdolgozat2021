const express = require("express");
const messageController = require("../../controllers/messages");
const checkAuth = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("",
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