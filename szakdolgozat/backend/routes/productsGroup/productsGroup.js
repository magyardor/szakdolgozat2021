const express = require("express");
const ProductsGroupController = require("../../controllers/productsGroup");
const router = express.Router();

router.get("",
  ProductsGroupController.getGroups
)

router.get("/:id",
  ProductsGroupController.getGroupsID
)

module.exports = router;
