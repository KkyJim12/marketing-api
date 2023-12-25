const router = require("express").Router();
const prebuiltContentController = require("../../controllers/admin/prebuiltContents.js");
const isAdmin = require("../../middlewares/isAdmin.js");
const {
  createPrebuiltContentValidate,
  createPrebuiltContentValidateResult,
} = require("../../validations/create-prebuilt-content");

module.exports = (app) => {
  // Routes
  router.get(
    "/:productId/prebuilt-contents",
    isAdmin,
    prebuiltContentController.index
  );
  router.post(
    "/:productId/prebuilt-contents",
    isAdmin,
    createPrebuiltContentValidate(),
    createPrebuiltContentValidateResult,
    prebuiltContentController.store
  );
  router.get(
    "/:productId/prebuilt-contents/:id/edit",
    isAdmin,
    prebuiltContentController.edit
  );
  router.put(
    "/:productId/prebuilt-contents/:id",
    isAdmin,
    prebuiltContentController.update
  );
  router.delete(
    "/:productId/prebuilt-contents/:id",
    isAdmin,
    prebuiltContentController.destroy
  );

  app.use("/api/v1/admin/products", router);
};
