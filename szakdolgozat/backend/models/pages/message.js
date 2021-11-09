const mongoose = require("mongoose");

const msgSchema = mongoose.Schema({
  last_name: {type: String, require: true},
  first_name: {type: String, require: true},
  email: {type: String, require: true},
  description: {type: String, require: true},
});

module.exports = mongoose.model('Messages', msgSchema);
