const Products = require("../models/pages/products");

exports.postProducts = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const products = new Products({
    name: req.body.name,
    parend_id: req.body.parend_id,
    description: req.body.description,
    price: req.body.price,
    imagePath: url + "/images/products/" + req.file.filename
  });
  console.log(products);
  products.save().then(result => {
    console.log(result);
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
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/products/" + req.file.filename
  }
  const products = new Products({
    _id: req.body.id,
    name: req.body.name,
    parend_id: req.body.parend_id,
    description: req.body.description,
    price: req.body.price,
    imagePath: req.body.imagePath
  });
  console.log(products);
  Products.updateOne({_id: req.params.id}, products).then(result => {
    if(result.n > 0){
      res.status(200).json(
        {message: "Update succsessful!"}
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
  /* const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page; */
  Products.find()
  /* let fetchproducts;
  if(pageSize && currentPage) {
    productsQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  productsQuery.then(documents => {
    fetchproducts = documents;
    return products.count();
  })*/
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
