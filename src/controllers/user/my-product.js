const {
  getMyProducts,
  getPrebuiltButtons,
  getButton,
  updateButtonStyle,
  updateButtonContents,
  getProductDetail,
  getPublicButton,
  getPrebuiltContents,
  getContents,
} = require("../../services/user/my-product");

exports.index = async (req, res) => {
  try {
    const myProducts = await getMyProducts(req, res);
    res.status(200).send({
      status: "success",
      data: myProducts,
      message: "Get my products success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};

exports.prebuiltButtons = async (req, res) => {
  try {
    const prebuiltButtons = await getPrebuiltButtons(req, res);
    res.status(200).send({
      status: "success",
      data: prebuiltButtons,
      message: "Get prebuilt buttons success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};

exports.prebuiltContents = async (req, res) => {
  try {
    const prebuiltContents = await getPrebuiltContents(req, res);
    res.status(200).send({
      status: "success",
      data: prebuiltContents,
      message: "Get prebuilt contents success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};

exports.button = async (req, res) => {
  try {
    const button = await getButton(req, res);
    res.status(200).send({
      status: "success",
      data: button,
      message: "Get button success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};

exports.contents = async (req, res) => {
  try {
    const contents = await getContents(req, res);
    res.status(200).send({
      status: "success",
      data: contents,
      message: "Get contents success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};

exports.saveButtonStyle = async (req, res) => {
  try {
    const button = await updateButtonStyle(req, res);
    res.status(200).send({
      status: "success",
      data: button,
      message: "Save button style success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};

exports.saveButtonContents = async (req, res) => {
  try {
    const contents = await updateButtonContents(req, res);
    res.status(200).send({
      status: "success",
      data: contents,
      message: "Save button contents success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};

exports.productDetail = async (req, res) => {
  try {
    const productDetail = await getProductDetail(req, res);
    res.status(200).send({
      status: "success",
      data: productDetail,
      message: "Get product detail success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};

exports.publicButton = async (req, res) => {
  try {
    const button = await getPublicButton(req, res);
    res.status(200).send({
      status: "success",
      data: button,
      message: "Get public button success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};
