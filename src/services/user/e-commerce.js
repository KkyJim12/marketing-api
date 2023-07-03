const db = require("../../models/index");
const Product = db.product;

exports.getProducts = async (req) => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    throw new Error(500);
  }
};
