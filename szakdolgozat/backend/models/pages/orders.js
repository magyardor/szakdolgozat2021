const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
  carts: [{
    id: { type: String},
    name: { type: String },
    description: { type: String },
    imagePath: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    total: { type: Number },
  }],
  data: [{
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
  }],
  transport: { type: Number },
  pay: { type: String },
});

module.exports = mongoose.model('Orders', ordersSchema);
