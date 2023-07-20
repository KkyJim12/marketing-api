const router = require("express").Router();
const myProductController = require("../../controllers/user/my-product.js");
const isAuth = require("../../middlewares/isAuth.js");

module.exports = (app) => {
  // Routes
  router.get("/", isAuth, myProductController.index);
  router.get(
    "/:id/prebuilt-buttons/:productId",
    myProductController.prebuiltButtons
  );

  app.use("/api/v1/user/my-products", router);
};
