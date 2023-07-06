module.exports = (app) => {
  const router = require("express").Router();
  const subPageController = require("../../controllers/admin/subPages.js");

  // Routes
  router.get("/", subPageController.index);
  router.post("/", subPageController.store);
  router.get("/:id/edit", subPageController.edit);
  router.put("/:id", subPageController.update);
  router.delete("/:id", subPageController.destroy);

  app.use("/api/v1/admin/sub-pages", router);
};
