module.exports = (app) => {
  const router = require("express").Router();
  const settingController = require("../../controllers/admin/settings.js");

  // Routes
  router.get("/", settingController.index);
  router.post("/", settingController.store);

  app.use("/api/v1/admin/settings", router);
};
