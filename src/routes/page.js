module.exports = (app) => {
  const router = require("express").Router();
  const pageController = require("../controllers/pages.js");

  // Routes
  router.get("/", pageController.index);

  app.use("/api/v1/pages", router);
};
