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

  router.get(
    "/:id/prebuilt-contents/:productId",
    myProductController.prebuiltContents
  );

  router.get("/:id/button/:productId", myProductController.button);

  router.get("/:id/contents/:productId", myProductController.contents);

  router.get(
    "/:id/product-detail/:productId",
    myProductController.productDetail
  );

  router.put(
    "/:id/save-button/:productId",
    myProductController.saveButtonStyle
  );

  router.put(
    "/:id/save-button-contents/:productId",
    isAuth,
    myProductController.saveButtonContents
  );

  router.get("/:id/public-button", myProductController.publicButton);

  app.use("/api/v1/user/my-products", router);
};
