const Orders = require("../models/pages/orders");
const mongoose = require("mongoose");

exports.postOrders = (req, res, next) => {
  const order = new Orders({
    _id: new mongoose.Types.ObjectId(),
    orders: req.body.orders
  });
  console.log(order);
  order.save().then(result => {
    console.log(result);
    if(result) {
      res.status(201).json({
        message: "Products added successfully",
        orders: {
          ...result,
          id: result._id
        }
      });
    }
    else{
      res.status(500).json({
        message: "",
        orders: {
          ...result,
          id: result._id
        }
      });
    }
  });
}

exports.getOrders = (req, res, next) => {}

exports.deleteOrders = (req, res, next) => {}
