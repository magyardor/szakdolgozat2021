const express = require("express");

const ProductsController = require("../../controllers/products");

const checkAuth = require("../../middleware/authMiddleware");
const img = require("../../middleware/imgProducts");

const router = express.Router();

router.post("",
  checkAuth,
  img,
  ProductsController.postProducts
);

router.put("/:id",
  checkAuth,
  img,
  ProductsController.putProducts
);

router.get("",
  ProductsController.getProducts
);

router.get("/:id",
  ProductsController.getProductsID
);

router.delete("/:id",
  checkAuth,
  ProductsController.deleteProducts
);


module.exports = router;
