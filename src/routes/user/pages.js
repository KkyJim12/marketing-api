module.exports = (app) => {
  const router = require("express").Router();
  const pageController = require("../../controllers/user/pages.js");

  // Routes
  router.get("/", pageController.index);

  app.use("/api/v1/user/pages", router);
};
