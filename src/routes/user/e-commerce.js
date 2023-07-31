const router = require("express").Router();
const eCommerceController = require("../../controllers/user/e-commerce.js");
const isAuth = require("../../middlewares/isAuth.js");

module.exports = (app) => {
  // Routes
  router.get("/", isAuth, eCommerceController.index);
  router.post("/:id", isAuth, eCommerceController.purchase);

  app.use("/api/v1/user/e-commerce", router);
};
