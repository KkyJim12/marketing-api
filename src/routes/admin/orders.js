const router = require("express").Router();
const orderController = require("../../controllers/admin/orders.js");
const isAdmin = require("../../middlewares/isAdmin.js");

module.exports = (app) => {
  // Routes
  router.get("/", isAdmin, orderController.index);
  router.put("/:id/cancel", isAdmin, orderController.cancel);
  router.put("/:id/decline", isAdmin, orderController.decline);
  router.put("/:id/accept", isAdmin, orderController.accept);

  app.use("/api/v1/admin/orders", router);
};
