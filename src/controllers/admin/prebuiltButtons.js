const {
  getPrebuiltButtons,
  createPrebuiltButton,
  deletePrebuiltButton,
} = require("../../services/admin/prebuiltButtons");

exports.index = async (req, res) => {
  try {
    const prebuiltButtons = await getPrebuiltButtons(req, res);
    res.status(200).send({
      status: "success",
      data: prebuiltButtons,
      message: "Get prebuiltButtons success.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

exports.store = async (req, res) => {
  try {
    const prebuiltButton = await createPrebuiltButton(req, res);
    res.status(201).send({
      status: "success",
      data: prebuiltButton,
      message: "Create prebuiltButton success.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

exports.destroy = async (req, res) => {
  try {
    await deletePrebuiltButton(req, res);
    res.status(200).send({
      status: "success",
      data: null,
      message: "Delete prebuilt button success",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};
