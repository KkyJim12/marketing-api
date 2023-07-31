const router = require("express").Router();
const subPageController = require("../../controllers/admin/subPages.js");
const isAdmin = require("../../middlewares/isAdmin.js");

module.exports = (app) => {
  // Routes
  router.get("/", isAdmin, subPageController.index);
  router.post("/", isAdmin, subPageController.store);
  router.get("/:id/edit", isAdmin, subPageController.edit);
  router.put("/:id", isAdmin, subPageController.update);
  router.delete("/:id", isAdmin, subPageController.destroy);

  app.use("/api/v1/admin/sub-pages", router);
};
