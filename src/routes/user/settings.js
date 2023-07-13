module.exports = (app) => {
  const router = require("express").Router();
  const settingController = require("../../controllers/user/settings.js");

  // Routes
  router.get("/", settingController.index);

  app.use("/api/v1/user/settings", router);
};
