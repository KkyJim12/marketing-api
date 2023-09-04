const router = require("express").Router();
const productController = require("../../controllers/guest/products.js");

module.exports = (app) => {
  // Routes
  router.get("/store-event", productController.storeEvent);

  app.use("/api/v1/guest/products", router);
};
