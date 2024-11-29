const db = require("../models/index");
const Statistic = db.statistic;

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
          ipAddress: req.headers.uniqueUserRef,
          sourceUrl: parsedUrl.hostname,
          currentUrl: req.headers.requesthost,
          sourceType:
            parsedUrl.hostname.includes("facebook.com") ||
            parsedUrl.hostname.includes("youtube.com") ||
            parsedUrl.hostname.includes("instagram.com")
              ? "Social Media"
              : parsedUrl.hostname.includes("google.co") &&
                req.headers.requesturl.includes("gclid")
              ? "Paid Search"
              : parsedUrl.hostname.includes("google.co") ||
                parsedUrl.hostname.includes("bing.com") ||
                parsedUrl.hostname.includes("yahoo.com")
              ? "Organic Search"
              : "Others",
          userProductId: req.params.id,
          sessionRef: req.headers.sessionref,
        });
      } else {
        await Statistic.create({
          ipAddress: req.headers.uniqueUserRef,
          sourceType: "Direct",
          currentUrl: req.headers.requesthost,
          userProductId: req.params.id,
          sessionRef: req.headers.sessionref,
        });
      }
    }

    next();
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};
