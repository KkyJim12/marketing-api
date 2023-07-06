const db = require("../../models/index");
const Page = db.page;

exports.getPages = async () => {
  const pages = await Page.findAll();
  return pages;
};

exports.createPage = async (req) => {
  try {
    const newPage = {
      name: req.body.name,
      sortType: req.body.sortType,
      sortValue: req.body.sortValue,
      content: req.body.content,
    };

    const page = await Page.create(newPage);
    return page;
  } catch (error) {
    throw new Error(500, "Error when creating a page");
  }
};

exports.getPage = async (req) => {
  try {
    const page = await Page.findOne({ where: { id: req.params.id } });
    if (page !== null) {
      return page;
    } else {
      const subPage = await SubPage.findOne({ where: { id: req.params.id } });
      return subPage;
    }
  } catch (error) {
    throw new Error(500, "Error when get a page");
  }
};

exports.updatePage = async (req) => {
  try {
    const newPage = {
      name: req.body.name,
      sortType: req.body.sortType,
      sortValue: req.body.sortValue,
      content: req.body.content,
    };

    const page = await Page.update(newPage, { where: { id: req.params.id } });
    return page;
  } catch (error) {
    throw new Error(500, "Error when update a page");
  }
};

exports.deletePage = async (req) => {
  try {
    const page = await Page.destroy({ where: { id: req.params.id } });
    return page;
  } catch (error) {
    throw new Error(500, "Error when delete a page");
  }
};
