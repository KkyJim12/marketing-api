module.exports = (app) => {
  const router = require("express").Router();
  const userController = require("../../controllers/admin/users.js");

  const {
    createUserValidate,
    createUserValidateResult,
  } = require("../../validations/create-user.js");

  // Routes
  router.get("/", userController.index);
  router.post(
    "/",
    createUserValidate(),
    createUserValidateResult,
    userController.store
  );
  router.get("/:id/edit", userController.edit);
  router.put("/:id", userController.update);
  router.delete("/:delete", userController.destroy);

  app.use("/api/v1/admin/users", router);
};
