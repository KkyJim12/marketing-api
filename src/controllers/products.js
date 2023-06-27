const {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../services/products");

exports.index = async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).send({
      status: "success",
      data: products,
      message: "Get products success.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

exports.store = async (req, res) => {
  try {
    const product = await createProduct(req);
    res.status(201).send({
      status: "success",
      data: product,
      message: "Create product success.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

exports.edit = async (req, res) => {
  try {
    const product = await getProduct(req);
    res.status(200).send({
      status: "success",
      data: product,
      message: "Get product success",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

exports.update = async (req, res) => {
  try {
    const product = await updateProduct(req);
    res.status(200).send({
      status: "success",
      data: product,
      message: "Update user success",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};

exports.destroy = async (req, res) => {
  try {
    await deleteProduct(req);
    res.status(204);
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};
