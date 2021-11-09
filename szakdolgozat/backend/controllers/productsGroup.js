const ProductsGroup = require("../models/pages/productsGroup");

exports.getProductsGroup = (req, res, next) => {
  ProductsGroup.find().then(result => {
    res.status(200).json({
      message: "Products Group fetched successfully!",
      productsGroup: result,
    });
  });
}
