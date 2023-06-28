const db = require("../../models/index");
const Product = db.product;

exports.getProducts = async () => {
  const products = await Product.findAll();
  return products;
};

exports.createProduct = async (req) => {
  const product = await Product.create({
    name: req.body.name,
    type: req.body.type,
    domains: req.body.domains,
    duration: req.body.duration,
    price: req.body.price,
    image: req.body.image,
  });
  return product;
};

exports.getProduct = async (req) => {
  const product = await product.findOne({ where: { id: req.params.id } });
  return product;
};

exports.updateProduct = async (req) => {
  const product = await Product.update(
    {
      name: req.body.name,
      type: req.body.type,
      domains: req.body.domains,
      duration: req.body.duration,
      price: req.body.price,
      image: req.body.image,
    },
    { where: { id: req.params.id } }
  );
  return product;
};

exports.deleteProduct = async (req) => {
  const product = await Product.destroy({ where: { id: req.params.id } });
  return product;
};
