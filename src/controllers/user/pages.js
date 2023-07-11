const { getPages, getPage } = require("../../services/user/pages");

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

exports.info = async (req, res) => {
  try {
    const page = await getPage(req, res);
    res.status(200).send({
      status: "success",
      data: page,
      message: "Get page success.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};
