const db = require("../../models/index");
const PrebuiltButton = db.prebuiltButton;

exports.getPrebuiltButtons = async (req, res) => {
  try {
    const prebuiltButtons = await PrebuiltButton.findAll({
      where: { id: req.params.productId },
    });
    return prebuiltButtons;
  } catch (error) {
    throw new Error(500, "Error when get a pre-built button");
  }
};

exports.createPrebuiltButton = async (req, res) => {
  try {
    const newPrebuiltButton = {
      backgroundColor: req.body.backgroundColor,
      textColor: req.body.textColor,
      textContent: req.body.textContent,
      size: req.body.size,
      top: req.body.top,
      right: req.body.right,
      bottom: req.body.bottom,
      left: req.body.left,
      iconType: req.body.iconType,
      icon: req.body.icon,
      visibleOnPc: req.body.visibleOnPc,
      visibleOnTablet: req.body.visibleOnTablet,
      visibleOnMobile: req.body.visibleOnMobile,
      productId: req.params.productId,
    };

    const prebuiltButton = await PrebuiltButton.create(newPrebuiltButton);
    return prebuiltButton;
  } catch (error) {
    throw new Error(500, "Error when creating a pre-built button");
  }
};

exports.deletePrebuiltButton = async (req, res) => {
  try {
    const prebuiltButton = await PrebuiltButton.destroy({
      where: { id: req.params.id },
    });
    return prebuiltButton;
  } catch (error) {
    throw new Error(500, "Error when delete a pre-built button");
  }
};
