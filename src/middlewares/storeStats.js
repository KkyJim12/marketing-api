const db = require("../models/index");
const Statistic = db.statistic;

module.exports = storeStats = async (req, res, next) => {
  try {
    console.log(req.headers.exactreferer);
    if (req.headers.exactreferer !== "") {
      const parsedUrl = new URL(req.headers.exactreferer);
      await Statistic.create({
        ipAddress: req.connection.remoteAddress,
        sourceUrl: parsedUrl.hostname,
        sourceType:
          parsedUrl.hostname.includes("facebook.com") ||
          parsedUrl.hostname.includes("youtube.com") ||
          parsedUrl.hostname.includes("instagram.com")
            ? "Social Network"
            : parsedUrl.hostname.includes("google.co") ||
              parsedUrl.hostname.includes("bing.com") ||
              parsedUrl.hostname.includes("yahoo.com")
            ? "Search Engine"
            : "Others",
        userProductId: req.params.id,
      });
    } else {
      await Statistic.create({
        ipAddress: req.connection.remoteAddress,
        sourceType: "Direct",
        userProductId: req.params.id,
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
