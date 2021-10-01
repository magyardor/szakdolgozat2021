const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth/auth");

const app = express();

mongoose.connect("mongodb+srv://dorina:34QZvkfYLLLhpCaP@webshop.zaoii.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to database!');
})
.catch(()=> {
  console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/auth", authRoutes);

module.exports = app;
