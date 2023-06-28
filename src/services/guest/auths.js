const db = require("../../models/index");
const Admin = db.admin;

exports.adminLogin = async (req) => {
  const admin = await Admin.findOne({
    where: { email: req.body.email, password: req.body.password },
    attributes: {
      exclude: ["password"],
    },
  });
  return admin;
};
