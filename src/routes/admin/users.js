const {
  editUserValidate,
  editUserValidateResult,
} = require("../../validations/edit-user.js");

const {
  createUserValidate,
  createUserValidateResult,
} = require("../../validations/create-user.js");

const router = require("express").Router();
const userController = require("../../controllers/admin/users.js");
const isAdmin = require("../../middlewares/isAdmin.js");

module.exports = (app) => {
  // Routes
  router.get("/", isAdmin, userController.index);
  router.post(
    "/",
    isAdmin,
    createUserValidate(),
    createUserValidateResult,
    userController.store
  );
  router.get("/:id/edit", isAdmin, userController.edit);
  router.put(
    "/:id",
    isAdmin,
    editUserValidate(),
    editUserValidateResult,
    userController.update
  );
  router.delete("/:id", isAdmin, userController.destroy);

  app.use("/api/v1/admin/users", router);
};
