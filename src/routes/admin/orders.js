module.exports = (app) => {
  const router = require("express").Router();
  const orderController = require("../../controllers/admin/orders.js");

  // Routes
  router.get("/", orderController.index);
  router.put("/:id/cancel", orderController.cancel);
  router.put("/:id/decline", orderController.decline);
  router.put("/:id/accept", orderController.accept);

  app.use("/api/v1/admin/orders", router);
};
