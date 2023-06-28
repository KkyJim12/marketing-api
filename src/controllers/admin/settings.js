const {
  getLatestSetting,
  createSetting,
} = require("../../services/admin/settings");

exports.index = async (req, res) => {
  try {
    const setting = await getLatestSetting();
    res.status(200).send({
      status: "success",
      data: setting,
      message: "Get setting success.",
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      data: null,
      message: "Something went wrong.",
    });
  }
};

exports.store = async (req, res) => {
  try {
    const setting = await createSetting(req);
    res.status(201).send({
      status: "success",
      data: setting,
      message: "Create setting success.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};
