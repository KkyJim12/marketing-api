const Sentry = require("@sentry/node");
const db = require("../../models/index");
const Page = db.page;
const SubPage = db.subPage;

exports.getPages = async () => {
  try {
    const pages = await Page.findAll({
      include: [{ model: SubPage }],
      order: [
        ["sortType", "desc"],
        ["sortValue", "asc"],
      ],
    });
    return pages;
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(500, "Error when get pages");
  }
};

exports.getPage = async (req, res) => {
  try {
    let page = await Page.findOne({ where: { id: req.params.id } });

    if (page === null) {
      page = await SubPage.findOne({ where: { id: req.params.id } });
    }

    return page;
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(500, "Error when get page");
  }
};
