const router = require("express").Router();
const prebuiltContentController = require("../../controllers/admin/prebuiltContents.js");
const isAdmin = require("../../middlewares/isAdmin.js");
const {
  createPrebuiltButtonValidate,
  createPrebuiltButtonValidateResult,
} = require("../../validations/create-prebuilt-button");

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
    createPrebuiltButtonValidate(),
    createPrebuiltButtonValidateResult,
    prebuiltContentController.store
  );
  router.delete(
    "/:productId/prebuilt-contents/:id",
    isAdmin,
    prebuiltContentController.destroy
  );

  app.use("/api/v1/admin/products", router);
};
