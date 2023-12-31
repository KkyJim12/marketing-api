const db = require("../models/index");
const WhiteListDomain = db.whiteListDomain;

module.exports = isValidDomain = async (req, res, next) => {
  try {
    const domainCount = await WhiteListDomain.count({
      where: { userProductId: req.params.id, url: req.headers.requesthost },
    });
    if (domainCount > 0) {
      return next();
    } else {
      res.status(500).send({ message: "This domain is not in whitelist." });
    }
  } catch (error) {
    console.log(error);
  }
};
