const { getOrders } = require("../../services/user/orders");

exports.index = async (req, res) => {
  try {
    const orders = await getOrders();
    res.status(200).send({
      status: "success",
      data: orders,
      message: "Get orders success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};
