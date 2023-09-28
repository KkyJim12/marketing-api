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

exports.createSetting = async (req) => {
  try {
    const setting = await Setting.create({
      eCommercePage: req.body.eCommerceContent,
      myProductPage: req.body.myProductContent,
      orderHistoryPage: req.body.orderHistoryContent,
      buttonSettingPage: req.body.buttonSettingContent,
      websiteSetupPage: req.body.websiteSetupContent,
    });
    return setting;
  } catch (error) {
    throw new Error(500, "Error when create a setting");
  }
};
