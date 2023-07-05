const db = require("../../models/index");
const SubPage = db.subPage;

exports.getSubPages = async () => {
  try {
    const subPages = await subPages.findAll();
    return subPages;
  } catch (error) {
    throw new Error(500, "Error when get a sub pages");
  }
};

exports.createSubPages = async (req) => {
  try {
    const newSubPage = {
      name: req.body.name,
      sortValue: req.body.sortValue,
      subMenuOf: req.body.subMenuOf,
      content: req.body.content,
    };

    const subPage = await SubPage.create(newSubPage);
    return subPage;
  } catch (error) {
    throw new Error(500, "Error when creating a sub page");
  }
};

exports.getSubPage = async (req) => {
  try {
    const subPage = await SubPage.findOne({ where: { id: req.params.id } });
    return subPage;
  } catch (error) {
    throw new Error(500, "Error when get a sub page");
  }
};

exports.updatePage = async (req) => {
  try {
    const newSubPage = {
      name: req.body.name,
      sortType: req.body.sortType,
      sortValue: req.body.sortValue,
      content: req.body.content,
    };

    const subPage = await SubPage.update(newSubPage, {
      where: { id: req.params.id },
    });
    return subPage;
  } catch (error) {
    throw new Error(500, "Error when update a sub page");
  }
};

exports.deletePage = async (req) => {
  try {
    const subPage = await SubPage.destroy({ where: { id: req.params.id } });
    return subPage;
  } catch (error) {
    throw new Error(500, "Error when delete a sub page");
  }
};
