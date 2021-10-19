const jsonwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const header = req.headers['authorization']
  let token;
  if (header) {
    const jwtArray = header.split(' ')
    token = jwtArray[1]
  }
  if (!token) {
    console.log('missing token');
  }
  if (token) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jsonwt.verify(token, "secret_message_token_validation_should_be_longer")
      var current_time = Date.now() / 1000;
      if (decoded.exp < current_time) {
        console.log('expired')
        res.status(401).json({message: "Auth failed!"});
        return
      }
    } catch (err) {
      res.status(401).json({message: "Auth failed!"});
    }

  }
  next();
}

/* module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    jsonwt.verify(token, "secret_message_token_validation_should_be_longer");
    next();
  }catch(error) {
    res.status(401).json({message: "Auth failed!"});
  }
}; */
