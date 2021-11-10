const mongoose = require("mongoose");

const productsGroupsSchema = mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('ProductsGroups', productsGroupsSchema);
