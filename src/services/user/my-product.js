const db = require("../../models/index");
const UserProduct = db.userProduct;
const PrebuiltButton = db.prebuiltButton;

exports.getMyProducts = async (req) => {
  try {
    const myProducts = await UserProduct.findAll({
      where: { userId: req.user.id },
    });
    return myProducts;
  } catch (error) {
    throw new Error(500, "Error when get orders");
  }
};

exports.getPrebuiltButtons = async (req) => {
  try {
    const prebuiltButtons = await PrebuiltButton.findAll({
      where: { productId: req.params.productId },
    });
    return prebuiltButtons;
  } catch (error) {
    throw new Error(500, "Error when get prebuilt buttons");
  }
};
