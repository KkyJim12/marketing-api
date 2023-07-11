module.exports = (app) => {
  const router = require("express").Router();
  const pageController = require("../../controllers/user/pages.js");

  // Routes
  router.get("/", pageController.index);
  router.get("/:id", pageController.info);

  app.use("/api/v1/user/pages", router);
};
