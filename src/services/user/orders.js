const db = require("../../models/index");
const Order = db.order;

exports.getOrders = async (req) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.user.id } });
    return orders;
  } catch (error) {
    throw new Error(500, "Error when get orders");
  }
};
