const bcrypt = require("bcrypt");
const db = require("../../models/index");
const User = db.user;

const saltRounds = 10;

exports.getUsers = async () => {
  const users = await User.findAll({
    attributes: {
      exclude: ["password"],
    },
  });
  return users;
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create({
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password, saltRounds),
    });
    return user;
  } catch (error) {
    throw new Error(500);
  }
};

exports.getUser = async (req) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    return user;
  } catch (error) {
    throw new Error(500);
  }
};

exports.updateUser = async (req) => {
  try {
    const newData = {
      fullName: req.body.fullName,
      phone: req.body.phone,
    };

    if (req.body.password) {
      newData.password = bcrypt.hashSync(req.body.password, saltRounds);
    }

    const user = await User.update(newData, { where: { id: req.params.id } });
    return user;
  } catch (error) {
    throw new Error(500);
  }
};

exports.deleteUser = async (req) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    return;
  } catch (error) {
    throw new Error(500);
  }
};
