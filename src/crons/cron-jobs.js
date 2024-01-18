const Sentry = require("@sentry/node");
const moment = require("moment");
const { Op } = require("sequelize");
const cron = require("node-cron");
const db = require("../models/index");
const UserProduct = db.userProduct;

const JOB_SCHEDULE = "* * * * *";

cron.schedule(JOB_SCHEDULE, async () => {
  try {
    const userProducts = await UserProduct.update(
      { status: "Expired" },
      {
        where: {
          status: "On going",
          endDate: {
            [Op.lt]: moment().toDate(),
          },
        },
      }
    );
  } catch (error) {
    Sentry.captureException(error);
  }
});
