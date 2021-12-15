const Messages = require("../models/pages/messages");

exports.postMessages = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const msg = new Messages({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    description: req.body.description,
    imagePath: url + "/images/messages/" + req.file.filename,
  });
  msg.save().then(result => {
    res.status(201).json({
      message: "Message added successfully",
      messages: {
        ...result,
        id: result._id
      }
    });
  });
}

exports.getMessages = (req, res, next) =>  {
  Messages.find().then(result => {
    res.status(200).json({
      message: "Message fetches successfully!",
      messages: result,
    });
  });
}

exports.deleteMessages = (req, res, next) => {
  Messages.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({
      message: "Message deleted!"
    });
  });
}
