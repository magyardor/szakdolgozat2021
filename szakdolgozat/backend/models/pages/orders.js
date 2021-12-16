const mongoose = require("mongoose");

const cartsSchema = mongoose.Schema({
  description: String,
  id: String,
  imagePath: String,
  name: String,
  price: Number,
  quantity: Number,
  total: Number
});

const orderSchema = mongoose.Schema({
  carts: [cartsSchema],
  data: {
    city: String,
    city_transport: String,
    email: String,
    fullName: String,
    fullName_transport: String,
    phone: Number,
    street: String,
    street_transport: String,
    taxNumber: Number,
    taxNumber_transport: Number,
    zipCode: Number,
    zipCode_transport: Number
  },
  pay: String,
  transport: Number,
  grandTotal: Number,
  orderTotal: Number
});


const ordersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  orders: [orderSchema],
});

module.exports = mongoose.model("Orders", ordersSchema, "orders");
