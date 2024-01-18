const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = isAdmin = async (req, res, next) => {
  try {
    if (typeof req.headers.authorization !== "undefined") {
      let token = req.headers.authorization;
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SIGN_SECRET,
        (err, decoded) => {
          if (err) {
            res
              .status(403)
              .send({ message: "Please login with admin credential first" });
          }
          req.user = decoded.user;
          return next();
        }
      );
    } else {
      res
        .status(403)
        .send({ message: "Please login with admin credential first" });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong " });
  }
};
