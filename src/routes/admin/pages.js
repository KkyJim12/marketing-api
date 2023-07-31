const {
  createPageValidate,
  createPageValidateResult,
} = require("../../validations/create-page.js");
const router = require("express").Router();
const pageController = require("../../controllers/admin/pages.js");
const isAdmin = require("../../middlewares/isAdmin.js");

module.exports = (app) => {
  // Routes
  router.get("/", pageController.index);
  router.post(
    "/",
    createPageValidate(),
    createPageValidateResult,
    pageController.store
  );
  router.get("/:id/edit", isAdmin, pageController.edit);
  router.put("/:id", isAdmin, pageController.update);
  router.delete("/:id", isAdmin, pageController.destroy);

  app.use("/api/v1/admin/pages", router);
};
