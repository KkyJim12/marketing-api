const {
  createProductValidate,
  createProductValidateResult,
} = require("../../validations/create-product.js");
const router = require("express").Router();
const productController = require("../../controllers/admin/products.js");
const isAdmin = require("../../middlewares/isAdmin.js");

module.exports = (app) => {
  // Routes
  router.get("/", isAdmin, productController.index);
  router.post(
    "/",
    isAdmin,
    createProductValidate(),
    createProductValidateResult,
    productController.store
  );
  router.get("/:id/edit", isAdmin, productController.edit);
  router.put("/:id", isAdmin, productController.update);
  router.delete("/:id", isAdmin, productController.destroy);

  app.use("/api/v1/admin/products", router);
};
