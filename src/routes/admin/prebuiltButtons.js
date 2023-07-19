module.exports = (app) => {
  const router = require("express").Router();
  const prebuiltButtonController = require("../../controllers/admin/prebuiltButtons.js");

  // Routes
  router.get("/:productId/prebuilt-buttons", prebuiltButtonController.index);
  router.post("/:productId/prebuilt-buttons", prebuiltButtonController.store);
  router.delete(
    "/:productId/prebuilt-buttons/:id",
    prebuiltButtonController.destroy
  );

  app.use("/api/v1/admin/products", router);
};
