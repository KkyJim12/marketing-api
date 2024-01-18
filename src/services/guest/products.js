const db = require("../../models/index");
const TargetStatistic = db.targetStatistic;

exports.storeEvent = async (req, res) => {
  try {
    const event = await TargetStatistic.create({
      currentUrl: req.headers.requesthost,
      sessionRef: req.headers.sessionref,
      fabContentId: req.headers.fabcontentid,
    });
    return event;
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(500, "Error when store an event");
  }
};
