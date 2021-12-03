const ProductsGroups = require("../models/pages/productsGroup");

exports.getGroups = (req, res, next) => {
  ProductsGroups.find()
  .then(result => {
    res.status(200).json({
      message: "Group fetched successfully",
      productsGroups: result,
    });
  });
}

exports.getGroupsID = (req, res, next) => {
  ProductsGroups.findById(req.params.id).then(productsGroups => {
    if(productsGroups) {
      res.status(200).json(productsGroups);
    }
    else {
      res.status(404).json({message: "Group not found!"});
    }
  });
}
