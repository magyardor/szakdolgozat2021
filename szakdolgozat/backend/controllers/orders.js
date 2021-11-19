const Orders = require("../models/pages/orders");

exports.postOrders = (req, res, next) => {
  const orders = new Orders({
    carts: [
      {id: req.body.id},
      {name: req.body.name},
      {description: req.body.description},
      {imageUrl: req.body.imageUrl},
      {price: req.body.price},
      {quantity: req.body.quantity},
      {total: req.body.total},
    ],
    data: [
      {city: req.body.city},
      {city_transport: req.body.city_transport},
      {email: req.body.email},
      {fullName: req.body.fullName},
      {fullName_transport: req.body.fullName_transport},
      {phone: req.body.phone},
      {street: req.body.street},
      {street_transport: req.body.street_transport},
      {taxNumber: req.body.taxNumber},
      {taxNumber_transport: req.body.taxNumber_transport},
      {zipCode: req.body.zipCode},
      {zipCode_transport: req.body.zipCode_transport},
    ],
    transport: req.body.transport,
    pay: req.body.transport
  });
  console.log(orders);
}

exports.getOrders = (req, res, next) => {}

exports.deleteOrders = (req, res, next) => {}
