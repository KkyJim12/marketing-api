const router = require("express").Router();
const prebuiltContentController = require("../../controllers/admin/prebuiltContents.js");

module.exports = (app) => {
  // Routes
  router.get("/:productId/prebuilt-contents", prebuiltContentController.index);
  router.post("/:productId/prebuilt-contents", prebuiltContentController.store);
  router.delete(
    "/:productId/prebuilt-contents/:id",
    prebuiltContentController.destroy
  );

  app.use("/api/v1/admin/products", router);
};
