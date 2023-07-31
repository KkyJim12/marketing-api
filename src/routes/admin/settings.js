const router = require("express").Router();
const settingController = require("../../controllers/admin/settings.js");
const isAdmin = require("../../middlewares/isAdmin.js");

module.exports = (app) => {
  // Routes
  router.get("/", isAdmin, settingController.index);
  router.post("/", isAdmin, settingController.store);

  app.use("/api/v1/admin/settings", router);
};
