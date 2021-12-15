const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  orders: {type: Array}
});

module.exports = mongoose.model("Orders", ordersSchema, "orders");
