const mongoose = require("mongoose");

const msgSchema = mongoose.Schema({
  lastName: {type: String, require: true},
  firstName: {type: String, require: true},
  email: {type: String, require: true},
  description: {type: String, require: true},
});

module.exports = mongoose.model('Messages', msgSchema);
