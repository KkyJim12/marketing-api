module.exports = (app) => {
  const router = require("express").Router();
  const authController = require("../../controllers/guest/auths.js");

  // Routes
  router.post("/admin-login", authController.adminLogin);

  app.use("/api/v1/guest/auths", router);
};
