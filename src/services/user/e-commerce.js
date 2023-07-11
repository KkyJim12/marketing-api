const db = require("../../models/index");
const Product = db.product;
const Order = db.order;

exports.getProducts = async (req) => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    throw new Error(500);
  }
};

exports.storeOrder = async (req) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });

    const newOrder = {
      name: product.name,
      type: product.type,
      domains: product.domains,
      duration: product.duration,
      price: product.price,
      status: "Wait for payment",
      paymentDate:null,
      productId: product.id,
    };

    const order = await Order.create(newOrder);
    return order;
  } catch (error) {
    throw new Error(500, "Error when store an order");
  }
};
