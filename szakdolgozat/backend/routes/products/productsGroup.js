const express = require("express");
const ProductsGroup = require("../../controllers/productsGroup");

const router = express.Router();

router.get("",
  ProductsGroup.getProductsGroup
);

module.exports = router;
