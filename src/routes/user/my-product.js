const router = require("express").Router();
const myProductController = require("../../controllers/user/my-product.js");
const isAuth = require("../../middlewares/isAuth.js");
const isValidDomain = require("../../middlewares/isValidDomain.js");
const isValidDevice = require("../../middlewares/isValidDevice.js");

module.exports = (app) => {
  // Routes
  router.get("/", isAuth, myProductController.index);
  router.get(
    "/:id/prebuilt-buttons/:productId",
    isAuth,
    myProductController.prebuiltButtons
  );

  router.get(
    "/:id/prebuilt-contents/:productId",
    isAuth,
    myProductController.prebuiltContents
  );

  router.get(
    "/:id/exist-contents/:productId",
    isAuth,
    myProductController.existContents
  );

  router.get("/:id/button/:productId", isAuth, myProductController.button);

  router.get("/:id/contents/:productId", isAuth, myProductController.contents);

  router.get(
    "/:id/product-detail/:productId",
    isAuth,
    myProductController.productDetail
  );

  router.post("/renew-product", isAuth, myProductController.renew);

  router.put(
    "/:id/save-button/:productId",
    isAuth,
    myProductController.saveButtonStyle
  );

  router.put(
    "/:id/save-button-contents/:productId",
    isAuth,
    myProductController.saveButtonContents
  );

  router.get(
    "/:id/whitelist-domain/:productId",
    isAuth,
    myProductController.getWhiteListDomains
  );

  router.post(
    "/:id/whitelist-domain/:productId",
    isAuth,
    myProductController.storeWhiteListDomain
  );

  router.delete(
    "/whitelist-domain/:domainId",
    isAuth,
    myProductController.removeWhiteListDomain
  );

  router.get(
    "/:id/public-button",
    isValidDomain,
    isValidDevice,
    myProductController.publicButton
  );

  app.use("/api/v1/user/my-products", router);
};
