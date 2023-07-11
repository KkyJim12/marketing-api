const { getOrders, cancelOrder } = require("../../services/user/orders");

exports.index = async (req, res) => {
  try {
    const orders = await getOrders(req, res);
    res.status(200).send({
      status: "success",
      data: orders,
      message: "Get orders success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};

exports.cancel = async (req, res) => {
  try {
    const order = await cancelOrder(req, res);
    res.status(200).send({
      status: "success",
      data: order,
      message: "Cancel orders success.",
    });
  } catch (error) {
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};
