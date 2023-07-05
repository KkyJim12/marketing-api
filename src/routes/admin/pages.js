const {
  createPageValidate,
  createPageValidateResult,
} = require("../../validations/create-page.js");

module.exports = (app) => {
  const router = require("express").Router();
  const pageController = require("../../controllers/admin/pages.js");

  // Routes
  router.get("/", pageController.index);
  router.post(
    "/",
    createPageValidate(),
    createPageValidateResult,
    pageController.store
  );
  router.get("/:id/edit", pageController.edit);
  router.put("/:id", pageController.update);
  router.delete("/:id", pageController.destroy);

  app.use("/api/v1/admin/pages", router);
};
