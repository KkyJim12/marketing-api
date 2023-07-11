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
    throw new Error(500, "Error when get pages");
  }
};
