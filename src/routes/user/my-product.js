const router = require("express").Router();
const myProductController = require("../../controllers/user/my-product.js");
const isAuth = require("../../middlewares/isAuth.js");

module.exports = (app) => {
  // Routes
  router.get("/", isAuth, myProductController.index);

  app.use("/api/v1/user/my-products", router);
};
