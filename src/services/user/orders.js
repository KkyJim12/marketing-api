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
