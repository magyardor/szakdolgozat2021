const Orders = require("../models/pages/orders");

exports.postOrders = (req, res, next) => {
  const orders = new Orders({
    carts: req.body.carts.map((carts) => {
      return {
        id: carts.id,
        name: carts.name,
        description: carts.description,
        imagePath: carts.imagePath,
        price: carts.price,
        quantity: carts.quantity,
        total: carts.total,
      };
    }),
    data: req.body.data.map((data) => {
      return {
        city: data.city,
        city_transport: data.city_transport,
        email: data.email,
        fullName: data.fullName,
        fullName_transport: data.fullName_transport,
        phone: data.phone,
        street: data.street,
        street_transport: data.street_transport,
        taxNumber: data.taxNumber,
        taxNumber_transport: data.taxNumber_transport,
        zipCode: data.zipCode,
        zipCode_transport: data.zipCode_transport,
      }
    }),
    transport: req.body.transport,
    pay: req.body.transport
  });
  console.log(orders);
  orders.save().then(result => {
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
