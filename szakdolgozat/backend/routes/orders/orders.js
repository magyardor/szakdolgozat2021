const express = require("express");
const OrdersController = require("../../controllers/orders");

const checkAuth = require("../../middleware/authMiddleware");
const img = require("../../middleware/orders");

const router = express.Router();

router.post("",
  img,
  OrdersController.postOrders
);

router.get("",
  img,
  checkAuth,
  OrdersController.getOrders
)

router.delete("/:id",
  checkAuth,
  OrdersController.deleteOrders
)

module.exports = router;
