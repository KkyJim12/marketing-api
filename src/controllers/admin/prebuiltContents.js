const {
  getPrebuiltContents,
  createPrebuiltContent,
  getPrebuiltContent,
  updatePrebuiltContent,
  deletePrebuiltContent,
} = require("../../services/admin/prebuiltContents");

exports.index = async (req, res) => {
  try {
    const prebuiltButtons = await getPrebuiltContents(req, res);
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
    const prebuiltButton = await createPrebuiltContent(req, res);
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

exports.edit = async (req, res) => {
  try {
    const prebuiltButton = await getPrebuiltContent(req, res);
    res.status(200).send({
      status: "success",
      data: prebuiltButton,
      message: "Get prebuiltButton success.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

exports.update = async (req, res) => {
  try {
    const prebuiltButton = await updatePrebuiltContent(req, res);
    res.status(200).send({
      status: "success",
      data: prebuiltButton,
      message: "Update prebuiltButton success.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

exports.destroy = async (req, res) => {
  try {
    await deletePrebuiltContent(req, res);
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
