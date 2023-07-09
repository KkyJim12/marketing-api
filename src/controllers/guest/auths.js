const { adminLogin, login } = require("../../services/guest/auths");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.adminLogin = async (req, res) => {
  try {
    const adminDetail = await adminLogin(req);
    const accessToken = jwt.sign(
      { user: adminDetail },
      process.env.ACCESS_TOKEN_SIGN_SECRET,
      { expiresIn: "3d" }
    );

    const detail = {
      user: adminDetail,
      accessToken: accessToken,
    };

    res.status(200).send({
      status: "success",
      data: detail,
      message: "Admin login success.",
    });
  } catch (error) {
    res
      .status(401)
      .send({ status: "fail", message: "Email or Password is wrong." });
  }
};

exports.login = async (req, res) => {
  try {
    const userDetail = await login(req);
    const accessToken = jwt.sign(
      { user: userDetail },
      process.env.ACCESS_TOKEN_SIGN_SECRET,
      { expiresIn: "3d" }
    );

    const detail = {
      user: userDetail,
      accessToken: accessToken,
    };

    res.status(200).send({
      status: "success",
      data: detail,
      message: "User login success.",
    });
  } catch (error) {
    res
      .status(401)
      .send({ status: "fail", message: "Email or Password is wrong." });
  }
};
