const db = require("../../models/index");
const Page = db.page;

exports.getPages = async () => {
  const pages = await Page.findAll();
  return pages;
};

exports.createPage = async (req) => {
  const page = await Page.create({
    name: req.body.name,
    sortType: req.body.sortType,
    sortNumber: req.body.sortNumber,
    mainPageId: req.body.mainPageId,
    content: req.body.content,
  });
  return page;
};

exports.getPage = async (req) => {
  const page = await page.findOne({ where: { id: req.params.id } });
  return page;
};

exports.updatePage = async (req) => {
  const page = await Page.update(
    {
      name: req.body.name,
      sortType: req.body.sortType,
      sortNumber: req.body.sortNumber,
      mainPageId: req.body.mainPageId,
      content: req.body.content,
    },
    { where: { id: req.params.id } }
  );
  return page;
};

exports.deletePage = async (req) => {
  const page = await Page.destroy({ where: { id: req.params.id } });
  return page;
};
