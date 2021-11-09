const mongoose = require("mongoose");

const productsGroupSchema = mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model('ProductsGroup', productsGroupSchema);
