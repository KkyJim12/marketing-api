const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
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
    res.status(204);
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};
