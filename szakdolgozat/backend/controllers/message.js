const Messages = require("../models/pages/message");

exports.postMsg = (req, res, next) => {
  const messages = new Messages({
    lastName: req.body.lastName,
    fistName: req.body.fistName,
    email: req.body.email,
    description: req.body.description,
  });
  console.log(messages);
  messages.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Message added successfully",
      messages: {
        ...result,
        id: result._id
      }
    });
  });
}

exports.getMsg = (req, res, next) =>  {
  Messages.find().then(result => {
    res.status(200).json({
      message: "Message fetches successfully!",
      messages: result,
    });
  });
}

exports.deleteMsg = (req, res, next) => {
  Messages.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({
      message: "Message deleted!"
    });
  });
}
