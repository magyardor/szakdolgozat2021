const Chat = require("../models/pages/chat");

exports.getChat = (req, res, next) => {
  Chat.find().then(result => {
    console.log(result);
    res.status(200).json({
      message: "Chat fetched successfully",
      chat: result,
    });
  });
}

exports.getChatID = (req, res, next) => {
  Chat.findById(req.params.id).then(result => {
    if(result) {
      res.status(200).json(result);
    }
    else {
      res.status(404).json({message: "Chat not found!"});
    }
  });
}
