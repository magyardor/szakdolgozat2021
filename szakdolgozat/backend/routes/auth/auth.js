const express = require("express");
const bcrypt = require("bcrypt"); // package that offers encryption functionalities
const jsonwt = require("jsonwebtoken"); //webtoken - login validation

const User = require("../../models/auth/auth");
const router = express.Router();

router.post("/adduser", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user =  new User({email: req.body.email, password: hash}); //password: req.body.password -> if someone successfully get in to our database, can read all user password
    user.save().then(result => {
      res.status(201).json({
        message: 'User created',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({ //todo: all status explane
        error: err
      });
    });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email}).then(user => {
    if(!user){
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    fetchedUser = user;
    /* when the input write the same password the hash would be the same */
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if(!result){
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    const token = jsonwt.sign(
      {email: fetchedUser.email, userId: fetchedUser._id},
      'secret_message_token_validation_should_be_longer',
      {expiresIn: "1h"} //token valid time set
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600
    });
  }).catch(err => {
    /* console.log(err, req.body.password, fetchedUser.password); */
    return res.status(401).json({
      message: "Auth failed"
    });
  });
});

module.exports = router;
