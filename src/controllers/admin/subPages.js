const {
  getSubPages,
  createSubPage,
  getSubPage,
  updateSubPage,
  deleteSubPage,
} = require("../../services/admin/subPages");

exports.index = async (req, res) => {
  try {
    const pages = await getSubPages();
    res.status(200).send({
      status: "success",
      data: pages,
      message: "Get pages success.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

exports.store = async (req, res) => {
  try {
    const subPage = await createSubPage(req);
    res.status(201).send({
      status: "success",
      data: subPage,
      message: "Create page success.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

exports.edit = async (req, res) => {
  try {
    const page = await getSubPage(req);
    res.status(200).send({
      status: "success",
      data: page,
      message: "Get page success",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

exports.update = async (req, res) => {
  try {
    const page = await updateSubPage(req);
    res.status(200).send({
      status: "success",
      data: page,
      message: "Update page success",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

exports.destroy = async (req, res) => {
  try {
    await deleteSubPage(req);
    res.status(200).send({
      status: "success",
      data: null,
      message: "Delete sub page success",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};
