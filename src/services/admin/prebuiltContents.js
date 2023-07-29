const db = require("../../models/index");
const PrebuiltContent = db.prebuiltContent;

exports.getPrebuiltContents = async (req, res) => {
  try {
    const prebuiltContents = await PrebuiltContent.findAll({
      where: { productId: req.params.productId },
    });
    return prebuiltContents;
  } catch (error) {
    throw new Error(500, "Error when get a pre-built contents");
  }
};

exports.createPrebuiltContent = async (req, res) => {
  try {
    const newPrebuiltContent = {
      backgroundColor: req.body.backgroundColor,
      textContent: req.body.textContent,
      icon: req.body.icon,
      description: req.body.description,
      destination: req.body.destination,
      productId: req.params.productId,
    };

    const prebuiltContent = await PrebuiltContent.create(newPrebuiltContent);
    return prebuiltContent;
  } catch (error) {
    console.log(error);
    throw new Error(500, "Error when creating a pre-built content");
  }
};

exports.deletePrebuiltContent = async (req, res) => {
  try {
    const prebuiltContent = await PrebuiltContent.destroy({
      where: { id: req.params.id },
    });
    return prebuiltContent;
  } catch (error) {
    throw new Error(500, "Error when delete a pre-built content");
  }
};
