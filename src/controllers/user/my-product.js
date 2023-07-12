const { getMyProducts } = require("../../services/user/my-product");

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
