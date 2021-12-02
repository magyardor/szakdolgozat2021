const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  contact: { type: String, require: true },
});

module.exports = mongoose.model('Chat', chatSchema);
