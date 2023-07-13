const { getLatestSetting } = require("../../services/user/settings");

exports.index = async (req, res) => {
  try {
    const settings = await getLatestSetting();
    res.status(200).send({
      status: "success",
      data: settings,
      message: "Get settings success.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};
