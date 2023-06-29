const { isCorrectJWT } = require("../../middlewares/isCorrectJWT.js");

module.exports = (app) => {
  const router = require("express").Router();
  const authController = require("../../controllers/guest/auths.js");

  // Routes
  router.post("/admin-login", authController.adminLogin);
  router.post("/login", authController.login);

  app.use("/api/v1/guest/auths", router);
};
