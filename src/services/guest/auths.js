const db = require("../../models/index");
const Admin = db.admin;
const User = db.user;
const bcrypt = require("bcrypt");

exports.adminLogin = async (req) => {
  const admin = await Admin.findOne({
    where: { email: req.body.email },
  });

  if (bcrypt.compareSync(req.body.password, admin.password)) {
    delete admin.password;
    return admin;
  } else {
    return false;
  }
};

exports.login = async (req) => {
  const user = await User.findOne({
    where: { email: req.body.email, password: req.body.password },
    attributes: {
      exclude: ["password"],
    },
  });
  return user;
};
