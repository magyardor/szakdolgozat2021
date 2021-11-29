const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth/auth");
const newsRoutes = require("./routes/news/news");
const productsRoutes = require("./routes/products/products");
const productsGroupRoutes = require("./routes/productsGroup/productsGroup");
const messagesRoutes = require("./routes/message/messages");
const ordersRoutes = require("./routes/orders/orders");

const app = express();
mongoose.connect("mongodb+srv://dorina:" + process.env.MONGO_DB_PASSWORD + "@webshop.zaoii.mongodb.net/myFirstDatabase")
.then(() => {
  console.log('Connected to database!');
})
.catch(()=> {
  console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/images/news", express.static(path.join("backend/images/news")));
app.use("/images/products", express.static(path.join("backend/images/products")));
app.use("/images/messages", express.static(path.join("backend/images/messages")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});
app.use((req, res, next) => {
  if (req.headers['content-type'] === 'application/json;') {
    req.headers['content-type'] = 'application/json';
  }
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/productsGroups", productsGroupRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/orders", ordersRoutes);

module.exports = app;
