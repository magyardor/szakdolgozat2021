const Products = require("../models/pages/products");

exports.postProducts = (req, res, next) => {
  const products = new Products({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imagePath: "/backend/images/products/" + req.file.filename,
    productsGroup: req.body.productsGroup
  });
  products.save().then(result => {
    res.status(201).json({
      message: "Products added successfully",
      products: {
        ...result,
        id: result._id
      }
    });
  });
}

exports.putProducts = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if(req.file) {
    imagePath = "/backend/images/products/" + req.file.filename
  }
  const products = new Products({
    _id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imagePath: imagePath,
    productsGroup: req.body.productsGroup
  });
  Products.updateOne({_id: req.params.id}, products).then(result => {
    if(result.n > 0){
      res.status(200).json(
        {message: "Update successful!"}
      );
    }
    else {
      res.status(401).json(
        {message: "Not authorized!"}
      );
    }
  });
}

exports.getProducts = (req, res, next) => {
  Products.find()
  .then(count => {
    res.status(200).json({
      message: "Products fetched successfully!",
      products: count,
    });
  });
}

exports.getProductsID =  (req, res, next) => {
  Products.findById(req.params.id).then(products => {
    if(products) {
      res.status(200).json(products);
    }
    else{
      res.status(404).json({message: "Products not found!"});
    }
  });
}

exports.deleteProducts = (req, res, next) => {
  Products.deleteOne({_id: req.params.id}).then( result => {
    res.status(200).json({
      message: "Products deleted!"
    });
  });
}
