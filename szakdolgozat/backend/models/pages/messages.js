const mongoose = require("mongoose");

const messagesSchema = mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String},
  description: {type: String},
  imagePath: { type: String },
});

module.exports = mongoose.model('Messages', messagesSchema);
