const router = require("express").Router();
const myProductController = require("../../controllers/user/my-product.js");
const isAuth = require("../../middlewares/isAuth.js");
const isValidDomain = require("../../middlewares/isValidDomain.js");
const isValidDevice = require("../../middlewares/isValidDevice.js");
const storeStats = require("../../middlewares/storeStats.js");
const isActive = require("../../middlewares/isActive.js");
const {
  saveButtonContentValidate,
  saveButtonContentValidateResult,
} = require("../../validations/save-button-content");

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

  router.get("/:id/stats/:productId", isAuth, myProductController.stats);

  router.get("/:id/websites/:productId", isAuth, myProductController.websites);

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
    saveButtonContentValidate(),
    saveButtonContentValidateResult,
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
    isActive,
    storeStats,
    isValidDomain,
    isValidDevice,
    myProductController.publicButton
  );

  app.use("/api/v1/user/my-products", router);
};
