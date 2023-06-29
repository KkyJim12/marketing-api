require("dotenv").config();

exports.isCorrectJWT = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      return res.sendStatus(401);
    }

    const token = req.headers["authorization"].replace("Bearer ", "");

    jwt.verify(token, process.env.ACCESS_TOKEN_SIGN_SECRET, (err, decoded) => {
      if (err) throw new Error(err);
    });
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};
