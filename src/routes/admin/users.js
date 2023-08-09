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
  router.get("/:userId/manage-products", isAdmin, userController.products);
  router.put(
    "/:id",
    isAdmin,
    editUserValidate(),
    editUserValidateResult,
    userController.update
  );
  router.delete("/:id", isAdmin, userController.destroy);
  router.put("/:userProductId/revoke", isAdmin, userController.revoke);
  router.post("/:userId/add-product", isAdmin, userController.addProduct);

  app.use("/api/v1/admin/users", router);
};
