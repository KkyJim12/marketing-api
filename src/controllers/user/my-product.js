const {
  getMyProducts,
  getPrebuiltButtons,
  getButton,
  updateButtonStyle,
  updateButtonContents,
  getProductDetail,
  getPublicButton,
  getPrebuiltContents,
  getExistContents,
  getContents,
  getAllWhiteListDomains,
  saveWhiteListDomain,
  removeDomain,
  renewProduct,
  getStats,
  getWebsites,
} = require("../../services/user/my-product");
const { URL } = require("url");

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

exports.existContents = async (req, res) => {
  try {
    const existContents = await getExistContents(req, res);
    res.status(200).send({
      status: "success",
      data: existContents,
      message: "Get exist contents success.",
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
    res.status(500).send({ status: "fail", message: "[pb05] Something went wrong" , reason : error.message });
  }
};

exports.getWhiteListDomains = async (req, res) => {
  try {
    const domains = await getAllWhiteListDomains(req, res);
    res.status(200).send({
      status: "success",
      data: domains,
      message: "Get whitelist domains success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};

exports.storeWhiteListDomain = async (req, res) => {
  try {
    const domain = await saveWhiteListDomain(req, res);
    res.status(201).send({
      status: "success",
      data: domain,
      message: "Save whitelist domain success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};

exports.removeWhiteListDomain = async (req, res) => {
  try {
    const domain = await removeDomain(req, res);
    res.status(200).send({
      status: "success",
      data: domain,
      message: "Remove whitelist domain success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};

exports.renew = async (req, res) => {
  try {
    const order = await renewProduct(req, res);
    res.status(200).send({
      status: "success",
      data: order,
      message: "Renew product success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};

exports.stats = async (req, res) => {
  try {
    const stats = await getStats(req, res);
    res.status(200).send({
      status: "success",
      data: stats,
      message: "Get product stats success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};

exports.websites = async (req, res) => {
  try {
    const websites = await getWebsites(req, res);
    res.status(200).send({
      status: "success",
      data: websites,
      message: "Get product websites success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};
