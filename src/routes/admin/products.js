module.exports = (app) => {
  const router = require("express").Router();
  const productController = require("../../controllers/admin/products.js");

  // Routes
  router.get("/", productController.index);

  app.use("/api/v1/admin/products", router);
};
