const db = require("../../models/index");
const Setting = db.setting;

exports.getLatestSetting = async () => {
  try {
    const setting = await Setting.findOne({
      order: [["createdAt", "DESC"]],
    });

    return setting;
  } catch (error) {
    throw new Error(500, "Error when get a latest setting");
  }
};
