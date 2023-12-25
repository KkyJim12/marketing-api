const router = require("express").Router();
const prebuiltButtonController = require("../../controllers/admin/prebuiltButtons.js");
const isAdmin = require("../../middlewares/isAdmin.js");

module.exports = (app) => {
  // Routes
  router.get(
    "/:productId/prebuilt-buttons",
    isAdmin,
    prebuiltButtonController.index
  );
  router.post(
    "/:productId/prebuilt-buttons",
    isAdmin,
    prebuiltButtonController.store
  );
  router.get(
    "/:productId/prebuilt-buttons/:id/edit",
    isAdmin,
    prebuiltButtonController.edit
  );
  router.put(
    "/:productId/prebuilt-buttons/:id",
    isAdmin,
    prebuiltButtonController.update
  );
  router.delete(
    "/:productId/prebuilt-buttons/:id",
    isAdmin,
    prebuiltButtonController.destroy
  );

  app.use("/api/v1/admin/products", router);
};
