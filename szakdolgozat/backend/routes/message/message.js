const express = require("express");
const messageController = require("../../controllers/message");
const checkAuth = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("",
  messageController.postMsg
);

router.get("",
  checkAuth,
  messageController.getMsg
);

router.delete("/:id",
  checkAuth,
  messageController.deleteMsg
);

module.exports = router;
