const {
  editUserValidate,
  editUserValidateResult,
} = require("../../validations/edit-user.js");

const {
  createUserValidate,
  createUserValidateResult,
} = require("../../validations/create-user.js");

module.exports = (app) => {
  const router = require("express").Router();
  const userController = require("../../controllers/admin/users.js");

  // Routes
  router.get("/", userController.index);
  router.post(
    "/",
    createUserValidate(),
    createUserValidateResult,
    userController.store
  );
  router.get("/:id/edit", userController.edit);
  router.put(
    "/:id",
    editUserValidate(),
    editUserValidateResult,
    userController.update
  );
  router.delete("/:id", userController.destroy);

  app.use("/api/v1/admin/users", router);
};
