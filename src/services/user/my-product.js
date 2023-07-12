const db = require("../../models/index");
const UserProduct = db.userProduct;

exports.getMyProducts = async (req) => {
  try {
    console.log(req.user.id);
    const myProducts = await UserProduct.findAll({
      where: { userId: req.user.id },
    });
    return myProducts;
  } catch (error) {
    throw new Error(500, "Error when get orders");
  }
};
