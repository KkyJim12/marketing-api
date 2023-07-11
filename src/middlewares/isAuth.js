require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = isAuth = async (req, res, next) => {
  if (typeof req.headers.authorization !== "undefined") {
    let token = req.headers.authorization;
    jwt.verify(token, process.env.ACCESS_TOKEN_SIGN_SECRET, (err, user) => {
      if (err) {
        res.status(403).send({ message: "Please login first" });
      }
      req.user = user;
      return next();
    });
  } else {
    res.status(403).send({ message: "Please login first" });
  }
};
