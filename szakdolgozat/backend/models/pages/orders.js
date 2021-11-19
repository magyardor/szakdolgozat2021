const mongoose = require("mongoose");

const cellCartSchema = mongoose.Schema({
  prod_id: { type: Number},
  name: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  price: { type: Number },
  quantity: { type: Number },
  total: { type: Number },
});

const cellDataSchema = mongoose.Schema({
  city: { type: String },
  city_transport: { type: String },
  email: { type: String },
  fullName: { type: String },
  fullName_transport: { type: String },
  phone: { type: Number },
  street: { type: String },
  street_transport: { type: String },
  taxNumber: { type: Number },
  taxNumber_transport: { type: Number },
  zipCode: { type: Number },
  zipCode_transport: { type: Number },
});

/* const cellOrderDataSchema = mongoose.Schema({
  transport: { type: Number },
  pay: { type: String }
}); */

const ordersSchema = mongoose.Schema({
  carts: [cellCartSchema],
  data: [cellDataSchema],
  transport: { type: Number },
  pay: { type: String },
});

module.exports = mongoose.model('Orders', ordersSchema);
