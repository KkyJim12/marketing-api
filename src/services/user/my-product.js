const db = require("../../models/index");
const UserProduct = db.userProduct;
const PrebuiltButton = db.prebuiltButton;
const PrebuiltContent = db.prebuiltContent;
const FloatingActionButton = db.floatingActionButton;
const FabContent = db.fabContent;
const WhiteListDomain = db.whiteListDomain;

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

exports.getExistContents = async (req) => {
  try {
    const existContents = await FabContent.findAll({
      where: { userProductId: req.params.id },
    });
    return existContents;
  } catch (error) {
    throw new Error(500, "Error when get exist contents");
  }
};

exports.getButton = async (req, res) => {
  try {
    const button = await FloatingActionButton.findOne({
      where: { userProductId: req.params.id },
    });
    return button;
  } catch (error) {
    throw new Error(500, "Error when get button");
  }
};

exports.getContents = async (req, res) => {
  try {
    const contents = await FabContent.findAll({
      where: { userProductId: req.params.id },
    });
    return contents;
  } catch (error) {
    throw new Error(500, "Error when get contents");
  }
};

exports.getPublicButton = async (req) => {
  try {
    const button = await FloatingActionButton.findOne({
      where: { userProductId: req.params.id },
    });

    const contents = await FabContent.findAll({
      where: {
        userProductId: req.params.id,
      },
    });
    return { button: button, contents: contents };
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
        prebuiltContentId: req.body.contents[i].id,
      });
      contents.push(content);
    }
    return contents;
  } catch (error) {
    console.log(error);
    throw new Error(500, "Error when save button contents");
  }
};

exports.getAllWhiteListDomains = async (req, res) => {
  try {
    const domains = await WhiteListDomain.findAll({
      where: {
        userProductId: req.params.id,
      },
    });

    return domains;
  } catch (error) {
    console.log(error);
    throw new Error(500, "Error when get white list domains");
  }
};

exports.saveWhiteListDomain = async (req, res) => {
  try {
    const storedDomains = await WhiteListDomain.count({
      where: { userProductId: req.params.id },
    });
    const thisProduct = await UserProduct.findOne({
      where: { id: req.params.id },
    });

    // Check avaiable domains
    console.log(storedDomains, thisProduct.domains);
    if (storedDomains >= thisProduct.domains) {
      throw new Error(422, "No more available domain slots");
    }

    const domain = await WhiteListDomain.create({
      url: req.body.url,
      productId: req.params.productId,
      userProductId: req.params.id,
      userId: req.user.id,
    });

    return domain;
  } catch (error) {
    console.log(error);
    throw new Error(500, "Error when save white list domain");
  }
};

exports.removeDomain = async (req, res) => {
  try {
    const domain = await WhiteListDomain.destroy({
      where: {
        id: req.params.domainId,
      },
    });

    return domain;
  } catch (error) {
    console.log(error);
    throw new Error(500, "Error when delete white list domains");
  }
};
