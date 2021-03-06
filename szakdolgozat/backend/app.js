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
const chatRoutes = require("./routes/chat/chat");

const app = express();
mongoose.connect("mongodb+srv://dorina:" + process.env.MONGO_DB_PASSWORD + "@webshop.zaoii.mongodb.net/myFirstDatabase")
.then(() => {
  console.log('Connected to database!');
})
.catch(()=> {
  console.log('Connection failed!');
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 100000
}));
app.use("/images/news", express.static(path.join(__dirname, "images/news")));
app.use("/images/products", express.static(path.join(__dirname, "images/products")));
app.use("/images/messages", express.static(path.join(__dirname, "images/messages")));
app.use("/", express.static(path.join(__dirname, "angular")));

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
app.use("/api/chat", chatRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;
