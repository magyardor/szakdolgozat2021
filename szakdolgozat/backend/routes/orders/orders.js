const express = require("express");
const OrdersController = require("../../controllers/orders");

const checkAuth = require("../../middleware/authMiddleware");
const img = require("../../middleware/imgProducts");

const router = express.Router();

router.post("",
  OrdersController.postOrders
);

router.get("",
  img,
  OrdersController.getOrders
)

router.delete("/:id",
  checkAuth,
  OrdersController.deleteOrders
)

module.exports = router;
