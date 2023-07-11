const router = require("express").Router();
const orderController = require("../../controllers/user/orders.js");
const isAuth = require("../../middlewares/isAuth.js");

module.exports = (app) => {
  // Routes
  router.get("/", isAuth, orderController.index);
  router.put("/:id/cancel", isAuth, orderController.cancel);
  router.put("/:id/make-payment", isAuth, orderController.makePayment);

  app.use("/api/v1/user/orders", router);
};
