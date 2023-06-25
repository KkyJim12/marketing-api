module.exports = (app) => {
  const router = require("express").Router();
  const userController = require("../controllers/users.js");

  // Routes
  router.get("/", userController.index);
  router.post("/", userController.store);

  app.use("/api/v1/users", router);
};
