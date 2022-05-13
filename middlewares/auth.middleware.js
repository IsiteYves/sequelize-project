const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).send("Access Denied! You need to login first.");
  try {
    const TokenArray = token.split(" ");
    let user = jwt.verify(TokenArray[1], process.env.JWT_KEY);
    req.user = user;
    next();
  } catch (e) {
    res.status(400).send("Invalid Token");
  }
};
