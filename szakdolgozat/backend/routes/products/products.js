const express = require("express");
const multer = require("multer");

const Products = require("../../models/pages/products");
const checkAuth = require("../../middleware/authMiddleware");

const router = express.Router();
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid) {
      error = null;
    }
    callback(error, "backend/images/products");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post("", multer({storage: storage}).single("image"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const products = new Products({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imagePath: url + "/images/" + req.file.filename
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
});

router.put("/:id", multer({storage: storage}).single("image"), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const products = new Products({
    _id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imagePath: imagePath
  });
  console.log(products);
  Products.updateOne({_id: req.params.id}, products).then(result => {
    res.status(200).json(
      {message: "Update succsessful!"}
    );
  });
});

router.get("", (req, res, next) => {
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
});

router.get("/:id", (req, res, next) => {
  Products.findById(req.params.id).then(products => {
    if(products) {
      res.status(200).json(products);
    }
    else{
      res.status(404).json({message: "Products not found!"});
    }
  });
});

router.delete("/:id",
  (req, res, next) => {
  Products.deleteOne({_id: req.params.id}).then( result => {
    res.status(200).json({
      message: "Products deleted!"
    });
  });
});


module.exports = router;
