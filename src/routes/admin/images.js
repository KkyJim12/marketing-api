module.exports = (app) => {
  const router = require("express").Router();
  const imageController = require("../controllers/images.js");

  // Routes
  router.get("/", imageController.upload);

  app.use("/api/v1/admin/images", router);
};
