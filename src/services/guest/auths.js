const db = require("../../models/index");
const Admin = db.admin;
const User = db.user;
const bcrypt = require("bcrypt");

exports.login = async (req) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const thisUser = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
      });

      thisUser.lastLogin = new Date();
      thisUser.save();

      return thisUser;
    } else {
      throw new Error(401);
    }
  } catch (error) {
    throw new Error(401);
  }
};

exports.adminLogin = async (req) => {
  try {
    const admin = await Admin.findOne({
      where: { email: req.body.email, password: req.body.password },
      attributes: {
        exclude: ["password"],
      },
    });
    if (admin === null) {
      throw new Error(401);
    } else {
      return admin;
    }
  } catch (error) {
    throw new Error(401);
  }
};
