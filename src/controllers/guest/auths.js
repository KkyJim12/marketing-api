const { adminLogin } = require("../../services/guest/auths");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.adminLogin = async (req, res) => {
  try {
    const adminDetail = await adminLogin(req);
    const accessToken = jwt.sign(
      { user: adminDetail },
      process.env.ACCESS_TOKEN_SIGN_SECRET,
      { expiresIn: "24h" }
    );

    const refreshToken = jwt.sign(
      { user: adminDetail },
      process.env.REFRESH_TOKEN_SIGN_SECRET,
      { expiresIn: "3d" }
    );

    const detail = {
      user: adminDetail,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    res
      .status(200)
      .send({ status: "success", data: detail, message: "Get users success." });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};
