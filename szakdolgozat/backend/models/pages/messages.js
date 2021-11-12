const mongoose = require("mongoose");

const messagesSchema = mongoose.Schema({
  lastName: {type: String},
  firstName: {type: String},
  email: {type: String},
  description: {type: String},
});

module.exports = mongoose.model('Messages', messagesSchema);
