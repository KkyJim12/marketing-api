const {
  getMyProducts,
  getPrebuiltButtons,
  getButton,
  updateButtonStyle,
  getProductDetail,
  getPublicButton,
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
