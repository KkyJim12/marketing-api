const {
  adminLoginValidate,
  adminLoginValidateResult,
} = require("../../validations/admin-login.js");
const {
  loginValidate,
  loginValidateResult,
} = require("../../validations/login.js");
const router = require("express").Router();
const authController = require("../../controllers/guest/auths.js");

module.exports = (app) => {
  // Routes
  router.post(
    "/admin-login",
    adminLoginValidate(),
    adminLoginValidateResult,
    authController.adminLogin
  );

  router.post(
    "/login",
    loginValidate(),
    loginValidateResult,
    authController.login
  );

  app.use("/api/v1/guest/auths", router);
};
