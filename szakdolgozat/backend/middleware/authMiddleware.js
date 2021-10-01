const jsonwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    jsonwt.verify(token, "secret_message_token_validation_should_be_longer");
    next();
  }catch(error) {
    res.status(401).json({message: "Auth failed!"});
  }
};
