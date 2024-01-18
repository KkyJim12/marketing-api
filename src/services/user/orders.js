const Sentry = require("@sentry/node");
const moment = require("moment");
const db = require("../../models/index");
const Order = db.order;
const Product = db.product;

exports.getOrders = async (req) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [{ model: Product }],
    });
    return orders;
  } catch (error) {
    Sentry.captureException(error);
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
    Sentry.captureException(error);
    throw new Error(500, "Error when update order status");
  }
};

exports.makePayment = async (req, res) => {
  try {
    const order = await Order.update(
      {
        status: "Wait for checking",
        image: req.body.image,
        paymentDate: moment().format(),
      },
      { where: { id: req.params.id } }
    );
    return order;
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(500, "Error when update order status");
  }
};
