const bcrypt = require("bcrypt");
const db = require("../../models/index");
const User = db.user;

const saltRounds = 10;

exports.getUsers = async () => {
  const users = await User.findAll();
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
  const user = await User.findOne({ where: { id: req.params.id } });
  return user;
};

exports.updateUser = async (req) => {
  const user = await User.update(
    {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password, saltRounds),
    },
    { where: { id: req.params.id } }
  );
  return user;
};

exports.deleteUser = async (req) => {
  const user = await User.destroy({ where: { id: req.params.id } });
  return user;
};
