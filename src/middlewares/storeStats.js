const db = require("../models/index");
const Statistic = db.statistic;
const moment = require("moment");

module.exports = storeStats = async (req, res, next) => {
  try {
    const latestSession = await Statistic.findOne({
      where: { sessionRef: req.headers.sessionref },
      order: [["createdAt", "DESC"]],
    });

    if (latestSession === null) {
      if (req.headers.exactreferer !== "") {
        const parsedUrl = new URL(req.headers.exactreferer);
        await Statistic.create({
          ipAddress: req.connection.remoteAddress,
          sourceUrl: parsedUrl.hostname,
          currentUrl: req.headers.requesthost,
          sourceType:
            parsedUrl.hostname.includes("facebook.com") ||
            parsedUrl.hostname.includes("youtube.com") ||
            parsedUrl.hostname.includes("instagram.com")
              ? "Social Media"
              : parsedUrl.hostname.includes("google.co") ||
                parsedUrl.hostname.includes("bing.com") ||
                parsedUrl.hostname.includes("yahoo.com")
              ? "Search Engine"
              : "Others",
          userProductId: req.params.id,
          sessionRef: req.headers.sessionref,
        });
      } else {
        await Statistic.create({
          ipAddress: req.connection.remoteAddress,
          sourceType: "Direct",
          currentUrl: req.headers.exactreferer,
          userProductId: req.params.id,
          sessionRef: req.headers.sessionref,
        });
      }
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
