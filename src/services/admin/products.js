const db = require("../../models/index");
const Product = db.product;

exports.getProducts = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    throw new Error(500, "Error when get products");
  }
};

exports.createProduct = async (req) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      type: req.body.type,
      domains: req.body.domains,
      duration: req.body.duration,
      price: req.body.price,
      image: req.body.image,
      footerHtml: req.body.footerHtml
    });
    return product;
  } catch (error) {
    console.log('admin-createProduct' , error.message);
    throw new Error(500, "Error when create a product");
  }
};

exports.getProduct = async (req) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    return product;
  } catch (error) {
    throw new Error(500, "Error when get a product");
  }
};

exports.updateProduct = async (req) => {
  try {
    console.log(req.body.footerHtml)
    const product = await Product.update(
      {
        name: req.body.name,
        type: req.body.type,
        domains: req.body.domains,
        duration: req.body.duration,
        price: req.body.price,
        image: req.body.image,
        footerHtml: req.body.footerHtml
      },
      { where: { id: req.params.id } }
    );
    return product;
  } catch (error) {
    console.log('admin-updateProduct' , error.message);
    throw new Error(500, "Error when update a product");
  }
};

exports.deleteProduct = async (req) => {
  try {
    const product = await Product.destroy({ where: { id: req.params.id } });
    return product;
  } catch (error) {
    throw new Error(500, "Error when delete a product");
  }
};
