const db = require("../models/index");
const UserProduct = db.userProduct;
const cron = require("node-cron");
const moment = require("moment");
const JOB_SCHEDULE = "* * * * *";
const { Op } = require("sequelize");

cron.schedule(JOB_SCHEDULE, async () => {
  console.log("Run task every minute");
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
    console.log(userProducts);
  } catch (error) {
    console.log(error);
  }
});
