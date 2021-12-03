const express = require("express");
const ChatController = require("../../controllers/chat");
const router = express.Router();

router.get("",
  ChatController.getChat
)

router.get("/:id",
  ChatController.getChatID
)

module.exports = router;
