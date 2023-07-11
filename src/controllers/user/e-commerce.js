const { getProducts, storeInvoice } = require("../../services/user/e-commerce");

exports.index = async (req, res) => {
  try {
    const products = await getProducts();

    res.status(200).send({
      status: "success",
      data: products,
      message: "Get products success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};

exports.purchase = async (req, res) => {
  try {
    const invoice = await storeInvoice(req);

    res.status(200).send({
      status: "success",
      data: invoice,
      message: "Get invoice success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};
