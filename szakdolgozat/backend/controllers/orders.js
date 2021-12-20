const Orders = require("../models/pages/orders");
const mongoose = require("mongoose");

exports.postOrders = (req, res, next) => {
  const order = new Orders({
    _id: new mongoose.Types.ObjectId(),
    orders: req.body.orders,
  });
  order.save().then(result => {
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

exports.getOrders = (req, res, next) => {
    Orders.find().then(count => {
      res.status(200).json({
        message: "Orders fetched successfully!",
        orders: count,
      });
    });
}

exports.getOrderID =  (req, res, next) => {
  Orders.findById(req.params.id).then(order => {
    if(order) {
      res.status(200).json(order);
    }
    else{
      res.status(404).json({message: "Order not found!"});
    }
  });
}

exports.deleteOrders = (req, res, next) => {
  Orders.deleteOne({_id: req.params.id}).then( result => {
    res.status(200).json({
      message: "Order deleted!"
    });
  });
}
