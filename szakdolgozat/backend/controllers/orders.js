const Orders = require("../models/pages/orders");

exports.postOrders = (req, res, next) => {
  const orders = new Orders({
    carts: req.body.carts,
    data: req.body.data,
    transport: req.body.transport,
    pay: req.body.transport
  });
  console.log(orders);
}

exports.getOrders = (req, res, next) => {}

exports.deleteOrders = (req, res, next) => {}
