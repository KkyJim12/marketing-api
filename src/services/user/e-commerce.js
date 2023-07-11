const db = require("../../models/index");
const Product = db.product;
const Invoice = db.invoice;

exports.getProducts = async (req) => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    throw new Error(500);
  }
};

exports.storeInvoice = async (req) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });

    const newInvoice = {
      name: product.name,
      type: product.type,
      domains: product.domains,
      duration: product.duration,
      price: product.price,
      productId: product.id,
      status: "Wait for payment",
    };

    const invoice = await Invoice.create(newInvoice);
    return invoice;
  } catch (error) {
    throw new Error(500, "Error when store an invoice");
  }
};
