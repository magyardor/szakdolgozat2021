const jsonwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jsonwt.verify(token, process.env.JWTOKEN_KEY)
    next();
  } catch (err) {
    res.status(401).json({message: "Auth failed!"});
  }
}
