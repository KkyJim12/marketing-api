const db = require("../models/index");
const UserProduct = db.userProduct;

module.exports = isActive = async (req, res, next) => {
  try {
    const thisUserProduct = await UserProduct.findOne({
      where: { id: req.params.id },
    });
    if (thisUserProduct.status === "On going") {
      return next();
    } else {
      res.status(500).send({ message: "This product is not active." });
    }
  } catch (error) {
    res.status(500).send({ message: "[pb01] Something went wrong", reason : error.message });
  }
};
