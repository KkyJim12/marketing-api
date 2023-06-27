module.exports = (app) => {
  const router = require("express").Router();
  const userController = require("../controllers/users.js");

  // Routes
  router.get("/", userController.index);
  router.post("/", userController.store);
  router.get("/:id/edit", userController.edit);
  router.put("/:id", userController.update);
  router.delete("/:delete", userController.destroy);

  app.use("/api/v1/users", router);
};
