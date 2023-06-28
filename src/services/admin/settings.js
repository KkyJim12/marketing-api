const db = require("../../models/index");
const Setting = db.setting;

exports.getLatestSetting = async () => {
  const setting = await Setting.findOne({
    order: [["createdAt", "DESC"]],
  });

  return setting;
};

exports.createSetting = async (req) => {
  const setting = await Setting.create({
    eCommercePage: req.body.eCommercePage,
    myProductPage: req.body.myProductPage,
    orderHistoryPage: req.body.orderHistoryPage,
  });
  return setting;
};
