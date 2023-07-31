const router = require("express").Router();
const pageController = require("../../controllers/user/pages.js");
const isAuth = require("../../middlewares/isAuth.js");

module.exports = (app) => {
  // Routes
  router.get("/", isAuth, pageController.index);
  router.get("/:id", isAuth, pageController.info);

  app.use("/api/v1/user/pages", router);
};
