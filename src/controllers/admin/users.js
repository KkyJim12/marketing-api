const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserProducts,
  extendUserProduct,
  revokeUserProduct,
  addProductToUser,
} = require("../../services/admin/users");

exports.index = async (req, res) => {
  try {
    const users = await getUsers();
    res
      .status(200)
      .send({ status: "success", data: users, message: "Get users success." });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

exports.store = async (req, res) => {
  try {
    const users = await createUser(req, res);
    res.status(201).send({
      status: "success",
      data: users,
      message: "Create user success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};

exports.edit = async (req, res) => {
  try {
    const user = await getUser(req);
    res
      .status(200)
      .send({ status: "success", data: user, message: "Get user success" });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

exports.update = async (req, res) => {
  try {
    const user = await updateUser(req);
    res
      .status(200)
      .send({ status: "success", data: user, message: "Update user success" });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

exports.destroy = async (req, res) => {
  try {
    await deleteUser(req);
    res
      .status(200)
      .send({ status: "success", data: null, message: "Delete user success" });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

exports.products = async (req, res) => {
  try {
    const userProducts = await getUserProducts(req, res);
    res.status(200).send({
      status: "success",
      data: userProducts,
      message: "Get user products success.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

exports.extend = async (req, res) => {
  try {
    const userProduct = await extendUserProduct(req, res);
    res.status(200).send({
      status: "success",
      data: userProduct,
      message: "Extend user product success.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

exports.revoke = async (req, res) => {
  try {
    const userProduct = await revokeUserProduct(req, res);
    res.status(200).send({
      status: "success",
      data: userProduct,
      message: "Revoke user product success.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const userProduct = await addProductToUser(req, res);
    res.status(200).send({
      status: "success",
      data: userProduct,
      message: "Add product to user success.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};
