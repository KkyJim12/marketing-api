module.exports = (app) => {
  const router = require("express").Router();
  const prebuiltButtonController = require("../../controllers/admin/prebuiltButtons.js");

  // Routes
  router.get("/", prebuiltButtonController.index);
  router.post("/", prebuiltButtonController.store);
  router.delete("/:id", prebuiltButtonController.destroy);

  app.use("/api/v1/admin/products/:productId/prebuilt-buttons", router);
};
