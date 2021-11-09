const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
  name: { type: String, required: true },
  parent_id: { type: Number, required: true },
  description: { type: String, required: true },
  imagePath: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Products', productsSchema);
