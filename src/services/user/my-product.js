const db = require("../../models/index");
const UserProduct = db.userProduct;
const PrebuiltButton = db.prebuiltButton;
const PrebuiltContent = db.prebuiltContent;
const FloatingActionButton = db.floatingActionButton;
const FabContent = db.fabContent;

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

exports.getPrebuiltContents = async (req) => {
  try {
    const prebuiltContents = await PrebuiltContent.findAll({
      where: { productId: req.params.productId },
    });
    return prebuiltContents;
  } catch (error) {
    throw new Error(500, "Error when get prebuilt contents");
  }
};

exports.getButton = async (req) => {
  try {
    const button = await FloatingActionButton.findOne({
      where: { userProductId: req.params.id },
    });
    return button;
  } catch (error) {
    throw new Error(500, "Error when get button");
  }
};

exports.getPublicButton = async (req) => {
  try {
    const button = await FloatingActionButton.findOne({
      where: { userProductId: req.params.id },
    });
    return button;
  } catch (error) {
    throw new Error(500, "Error when get button");
  }
};

exports.getProductDetail = async (req, res) => {
  try {
    const productDetail = await UserProduct.findOne({
      where: { id: req.params.id },
    });
    return productDetail;
  } catch (error) {
    throw new Error(500, "Error when get product detail");
  }
};

exports.updateButtonStyle = async (req, res) => {
  try {
    const button = await FloatingActionButton.update(
      {
        backgroundColor: req.body.backgroundColor,
        bodyColor: req.body.bodyColor,
        textColor: req.body.textColor,
        textContent: req.body.textContent,
        size: req.body.size,
        top: req.body.top,
        right: req.body.right,
        bottom: req.body.bottom,
        left: req.body.left,
        iconType: req.body.iconType,
        icon: req.body.icon,
        visibleOnPC: req.body.visibleOnPC,
        visibleOnTablet: req.body.visibleOnTablet,
        visibleOnMobile: req.body.visibleOnMobile,
      },
      {
        where: { userProductId: req.params.id },
      }
    );
    return button;
  } catch (error) {
    throw new Error(500, "Error when save button style");
  }
};

exports.updateButtonContents = async (req, res) => {
  try {
    // Delete first
    await FabContent.destroy({
      where: { userProductId: req.params.id },
    });

    const contents = [];
    for (let i = 0; i < req.body.contents.length; i++) {
      const content = await FabContent.create({
        backgroundColor: req.body.contents[i].backgroundColor,
        textContent: req.body.contents[i].textContent,
        description: req.body.contents[i].description,
        destination: req.body.contents[i].destination,
        icon: req.body.contents[i].icon,
        productId: req.params.productId,
        userProductId: req.params.id,
        userId: req.user.id,
      });
      contents.push(content);
    }
    return contents;
  } catch (error) {
    console.log(error);
    throw new Error(500, "Error when save button contents");
  }
};
