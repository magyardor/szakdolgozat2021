const mongoose = require("mongoose");
const { type } = require("os");

const productsSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imagePath: { type: String, required: true },
  price: { type: Number, required: true },
  productsGroup: { type: String, required: true },
});

module.exports = mongoose.model('Products', productsSchema);
