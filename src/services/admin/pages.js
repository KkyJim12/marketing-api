const db = require("../../models/index");
const Page = db.page;
const SubPage = db.subPage;

exports.getPages = async () => {
  const pages = await Page.findAll();
  const subPages = await SubPage.findAll({ include: [{ model: Page }] });
  const mergePages = pages.concat(subPages);
  return mergePages;
};

exports.getMainPages = async () => {
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

    if (req.body.subMenuOf !== null) {
      newPage.pageId = req.body.subMenuOf;
      const subPage = await SubPage.create(newPage);
      return subPage;
    } else {
      const page = await Page.create(newPage);
      return page;
    }
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
    // Initial is sub page
    if (SubPage.count({ where: { id: req.params.id } }) > 0) {
      if (req.body.subMenuOf === null) {
        await SubPage.destroy({ where: { id: req.params.id } });
        const page = await Page.create({
          name: req.body.name,
          sortType: req.body.sortType,
          sortValue: req.body.sortValue,
          content: req.body.content,
        });
        return page;
      } else {
        const subPage = await SubPage.update({
          name: req.body.name,
          sortType: req.body.sortType,
          sortValue: req.body.sortValue,
          content: req.body.content,
          pageId: req.body.subMenuOf,
        });
        return subPage;
      }
    } else {
      if (req.body.subMenuof === null) {
        const page = await Page.update({
          name: req.body.name,
          sortType: req.body.sortType,
          sortValue: req.body.sortValue,
          content: req.body.content,
        });
        return page;
      } else {
        await Page.destroy({ where: { id: req.params.id } });
        const subPage = await SubPage.create({
          name: req.body.name,
          sortType: req.body.sortType,
          sortValue: req.body.sortValue,
          content: req.body.content,
          pageId: req.body.subMenuOf,
        });
        return subPage;
      }
    }
  } catch (error) {
    throw new Error(500, "Error when update a page");
  }
};

exports.deletePage = async (req) => {
  const page = await Page.destroy({ where: { id: req.params.id } });
  return page;
};
