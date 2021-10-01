const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth/auth");
const newsRoutes = require("./routes/news/news");

const app = express();

mongoose.connect("mongodb+srv://dorina:34QZvkfYLLLhpCaP@webshop.zaoii.mongodb.net/myFirstDatabase")
.then(() => {
  console.log('Connected to database!');
})
.catch(()=> {
  console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/auth", authRoutes);
app.use("api/news", newsRoutes);

module.exports = app;