const {
  createProductValidate,
  createProductValidateResult,
} = require("../../validations/create-product.js");

module.exports = (app) => {
  const router = require("express").Router();
  const productController = require("../../controllers/admin/products.js");

  // Routes
  router.get("/", productController.index);
  router.post(
    "/",
    createProductValidate(),
    createProductValidateResult,
    productController.store
  );
  router.get("/:id/edit", productController.edit);
  router.put("/:id", productController.update);
  router.delete("/:id", productController.destroy);

  app.use("/api/v1/admin/products", router);
};
