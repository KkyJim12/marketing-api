require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = isAdmin = async (req, res, next) => {
  if (typeof req.headers.authorization !== "undefined") {
    let token = req.headers.authorization;
    jwt.verify(token, process.env.ACCESS_TOKEN_SIGN_SECRET, (err, decoded) => {
      if (err) {
        res
          .status(403)
          .send({ message: "Please login with admin credential first" });
      }
      req.user = decoded.user;
      return next();
    });
  } else {
    res
      .status(403)
      .send({ message: "Please login with admin credential first" });
  }
};
