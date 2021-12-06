const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  orders: [mongoose.Schema.Types.Mixed]
});

module.exports = mongoose.model('Orders', ordersSchema);
