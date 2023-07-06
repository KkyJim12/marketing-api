const {
  getPages,
  createPage,
  getPage,
  updatePage,
  deletePage,
} = require("../../services/admin/pages");

exports.index = async (req, res) => {
  try {
    const pages = await getPages();
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
    const page = await createPage(req);
    res.status(201).send({
      status: "success",
      data: page,
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
    const page = await getPage(req);
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
    const page = await updatePage(req);
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
    await deletePage(req);
    res
      .status(200)
      .send({ status: "success", data: null, message: "Delete page success" });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};
