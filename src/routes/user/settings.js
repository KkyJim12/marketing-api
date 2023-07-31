const router = require("express").Router();
const settingController = require("../../controllers/user/settings.js");
const isAuth = require("../../middlewares/isAuth.js");

module.exports = (app) => {
  // Routes
  router.get("/", isAuth, settingController.index);

  app.use("/api/v1/user/settings", router);
};
