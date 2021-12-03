/*
Author: Maximilian Schwarzmüller
Github repo: https://github.com/PacktPublishing/Angular-and-Node.js---The-MEAN-Stack-Guide
Udemy video: https://www.udemy.com/course/angular-2-and-nodejs-the-practical-guide/
*/
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const authSchema = mongoose.Schema({
  email: { type: String, require: true, unique: true},
  password: { type: String, require: true},
});

authSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Auth', authSchema);
