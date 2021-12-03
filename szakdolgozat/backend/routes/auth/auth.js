const express = require("express");
const AuthController = require("../../controllers/auth");
const router = express.Router();

router.post("/adduser", AuthController.createUser);

router.post("/login", AuthController.loginUser);

module.exports = router;
