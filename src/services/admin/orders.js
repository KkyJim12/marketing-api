const db = require("../../models/index");
const Order = db.order;

exports.getOrders = async () => {
  try {
    const orders = await Order.findAll();
    return orders;
  } catch (error) {
    throw new Error(500, "Error when get orders");
  }
};

exports.cancelOrder = async (req) => {
  try {
    const order = await Order.update(
      { status: "Cancel" },
      { where: { id: req.params.id } }
    );
    return order;
  } catch (error) {
    throw new Error(500, "Error when update order status");
  }
};

exports.declineOrder = async (req) => {
  try {
    const order = await Order.update(
      { status: "Wait for payment" },
      { where: { id: req.params.id } }
    );
    return order;
  } catch (error) {
    throw new Error(500, "Error when update order status");
  }
};

exports.acceptOrder = async (req) => {
  try {
    const order = await Order.update(
      { status: "Success" },
      { where: { id: req.params.id } }
    );
    return order;
  } catch (error) {
    throw new Error(500, "Error when update order status");
  }
};
