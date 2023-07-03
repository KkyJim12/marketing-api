const { getProducts } = require("../../services/user/e-commerce");

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
