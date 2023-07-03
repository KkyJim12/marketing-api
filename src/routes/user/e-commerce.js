const { isCorrectJWT } = require("../../middlewares/isCorrectJWT.js");

module.exports = (app) => {
  const router = require("express").Router();
  const eCommerceController = require("../../controllers/user/e-commerce.js");

  // Routes
  router.get("/e-commerce", isCorrectJWT, eCommerceController.index);

  app.use("/api/v1/user/e-commerce", router);
};
