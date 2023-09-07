const db = require("../../models/index");
const UserProduct = db.userProduct;
const PrebuiltButton = db.prebuiltButton;
const PrebuiltContent = db.prebuiltContent;
const FloatingActionButton = db.floatingActionButton;
const FabContent = db.fabContent;
const WhiteListDomain = db.whiteListDomain;
const Order = db.order;
const moment = require("moment");
const Statistic = db.statistic;
const { Op } = require("sequelize");
const TargetStatistic = db.targetStatistic;

exports.getMyProducts = async (req) => {
  try {
    const myProducts = await UserProduct.findAll({
      where: { userId: req.user.id },
    });
    return myProducts;
  } catch (error) {
    throw new Error(500, "Error when get orders");
  }
};

exports.getPrebuiltButtons = async (req) => {
  try {
    const prebuiltButtons = await PrebuiltButton.findAll({
      where: { productId: req.params.productId },
    });
    return prebuiltButtons;
  } catch (error) {
    throw new Error(500, "Error when get prebuilt buttons");
  }
};

exports.getPrebuiltContents = async (req) => {
  try {
    const prebuiltContents = await PrebuiltContent.findAll({
      where: { productId: req.params.productId },
    });
    return prebuiltContents;
  } catch (error) {
    throw new Error(500, "Error when get prebuilt contents");
  }
};

exports.getExistContents = async (req) => {
  try {
    const existContents = await FabContent.findAll({
      where: { userProductId: req.params.id },
    });
    return existContents;
  } catch (error) {
    throw new Error(500, "Error when get exist contents");
  }
};

exports.getButton = async (req, res) => {
  try {
    const button = await FloatingActionButton.findOne({
      where: { userProductId: req.params.id },
    });
    return button;
  } catch (error) {
    throw new Error(500, "Error when get button");
  }
};

exports.getContents = async (req, res) => {
  try {
    const contents = await FabContent.findAll({
      where: { userProductId: req.params.id },
    });
    return contents;
  } catch (error) {
    throw new Error(500, "Error when get contents");
  }
};

exports.getPublicButton = async (req) => {
  try {
    const button = await FloatingActionButton.findOne({
      where: { userProductId: req.params.id },
    });

    const contents = await FabContent.findAll({
      where: {
        userProductId: req.params.id,
      },
    });
    return { button: button, contents: contents };
  } catch (error) {
    throw new Error(500, "Error when get button");
  }
};

exports.getProductDetail = async (req, res) => {
  try {
    const productDetail = await UserProduct.findOne({
      where: { id: req.params.id },
    });
    return productDetail;
  } catch (error) {
    throw new Error(500, "Error when get product detail");
  }
};

exports.updateButtonStyle = async (req, res) => {
  try {
    const button = await FloatingActionButton.update(
      {
        buttonStyle: req.body.buttonStyle,
        backgroundColor: req.body.backgroundColor,
        bodyColor: req.body.bodyColor,
        textColor: req.body.textColor,
        textContent: req.body.textContent,
        size: req.body.size,
        top: req.body.top,
        right: req.body.right,
        bottom: req.body.bottom,
        left: req.body.left,
        iconType: req.body.iconType,
        icon: req.body.icon,
        visibleOnPC: req.body.visibleOnPC,
        visibleOnTablet: req.body.visibleOnTablet,
        visibleOnMobile: req.body.visibleOnMobile,
      },
      {
        where: { userProductId: req.params.id },
      }
    );
    return button;
  } catch (error) {
    throw new Error(500, "Error when save button style");
  }
};

exports.updateButtonContents = async (req, res) => {
  try {
    // Delete first
    await FabContent.destroy({
      where: { userProductId: req.params.id },
    });

    const contents = [];
    for (let i = 0; i < req.body.contents.length; i++) {
      const newContent = {
        backgroundColor: req.body.contents[i].backgroundColor,
        textContent: req.body.contents[i].textContent,
        description: req.body.contents[i].description,
        destination: req.body.contents[i].destination,
        icon: req.body.contents[i].icon,
        productId: req.params.productId,
        userProductId: req.params.id,
        userId: req.user.id,
      };
      const isPrebuiltContent = await PrebuiltContent.count({
        where: {
          id: req.body.contents[i].id,
        },
      });

      if (isPrebuiltContent > 0) {
        newContent.prebuiltContentId = req.body.contents[i].id;
      } else {
        newContent.prebuiltContentId = null;
      }
      const content = await FabContent.create(newContent);
      contents.push(content);
    }
    return contents;
  } catch (error) {
    console.log(error);
    throw new Error(500, "Error when save button contents");
  }
};

exports.getAllWhiteListDomains = async (req, res) => {
  try {
    const domains = await WhiteListDomain.findAll({
      where: {
        userProductId: req.params.id,
      },
    });

    return domains;
  } catch (error) {
    console.log(error);
    throw new Error(500, "Error when get white list domains");
  }
};

exports.saveWhiteListDomain = async (req, res) => {
  try {
    const storedDomains = await WhiteListDomain.count({
      where: { userProductId: req.params.id },
    });
    const thisProduct = await UserProduct.findOne({
      where: { id: req.params.id },
    });

    // Check avaiable domains
    console.log(storedDomains, thisProduct.domains);
    if (storedDomains >= thisProduct.domains) {
      throw new Error(422, "No more available domain slots");
    }

    const domain = await WhiteListDomain.create({
      url: req.body.url,
      productId: req.params.productId,
      userProductId: req.params.id,
      userId: req.user.id,
    });

    return domain;
  } catch (error) {
    console.log(error);
    throw new Error(500, "Error when save white list domain");
  }
};

exports.removeDomain = async (req, res) => {
  try {
    const domain = await WhiteListDomain.destroy({
      where: {
        id: req.params.domainId,
      },
    });

    return domain;
  } catch (error) {
    console.log(error);
    throw new Error(500, "Error when delete white list domains");
  }
};

exports.renewProduct = async (req, res) => {
  try {
    const product = await UserProduct.findOne({
      where: { id: req.body.product.id },
    });

    if (product.status !== "Expired") {
      throw new Error(500, "Your product is not expired yet");
    }

    const thisUserProduct = UserProduct.update(
      { status: "Renew" },
      {
        where: { id: product.id },
      }
    );

    const newOrder = {
      name: product.name,
      type: product.type,
      domains: product.domains,
      duration: product.duration,
      price: product.price,
      status: "Wait for payment",
      paymentDate: product.price,
      userId: req.user.id,
      productId: product.productId,
    };

    const order = await Order.create(newOrder);

    return order;
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};

exports.getStats = async (req, res) => {
  try {
    const groupByKey = (list, key) =>
      list.reduce(
        (hash, obj) => ({
          ...hash,
          [obj[key].toLowerCase().split(" ").join("_")]: (
            hash[obj[key]] || []
          ).concat(obj),
        }),
        {}
      );

    console.log();

    const where =
      req.query.startDate && req.query.endDate
        ? {
            userProductId: req.params.id,
            createdAt: {
              [Op.between]: [
                moment(req.query.startDate).format("YYYY-MM-DD 00:00:00"),
                moment(req.query.endDate).format("YYYY-MM-DD 23:59:59"),
              ],
            },
          }
        : {
            userProductId: req.params.id,
          };

    const stats = await Statistic.findAll({
      where: where,
      include: TargetStatistic,
    });

    let labelsByPeriod = [];
    let sessionsByPeriod = [];
    let usersByPeriod = [];
    let conversionByPeriod = [];

    const getGraphData = (range) => {
      let ipAddresses = [];
      for (let i = 0; i < range; i++) {
        const date = moment(req.query.endDate)
          .subtract(range - 1 - i, "days")
          .format("MMM DD YYYY");
        labelsByPeriod.push(
          moment(req.query.endDate)
            .subtract(range - 2 - i, "days")
            .format("MM/DD")
        );

        // Session Count
        let sessionCount = 0;
        for (let j = 0; j < stats.length; j++) {
          if (stats[j].createdAt.toString().includes(date)) {
            sessionCount++;
          }
        }
        sessionsByPeriod.push(sessionCount);

        // User Count
        let userCount = 0;

        for (let j = 0; j < stats.length; j++) {
          if (
            stats[j].createdAt.toString().includes(date) &&
            !ipAddresses.includes(stats[j].ipAddress)
          ) {
            ipAddresses.push(stats[j].ipAddress);
            userCount++;
          }
        }
        usersByPeriod.push(userCount);

        // Conversion Count
        let conversionCount = 0;

        for (let k = 0; k < stats.length; k++) {
          if (stats[k].createdAt.toString().includes(date)) {
            conversionCount += stats[k].target_statistics.length;
          }
        }
        conversionByPeriod.push(conversionCount);
      }

      return {
        labels: labelsByPeriod,
        sessions: sessionsByPeriod,
        users: usersByPeriod,
        conversions: conversionByPeriod,
      };
    };

    let graphData;

    if (req.query.period === "Today") {
      graphData = getGraphData(1);
    } else if (req.query.period === "7 Days") {
      graphData = getGraphData(7);
    } else if (req.query.period === "30 Days") {
      graphData = getGraphData(30);
    } else if (req.query.period === "90 Days") {
      graphData = getGraphData(90);
    } else {
      graphData = getGraphData(
        parseInt(
          moment(req.query.endDate).diff(moment(req.query.startDate), "days")
        ) + 1
      );
    }

    const sessionCount = stats.length;
    const totalUserCount = Object.keys(groupByKey(stats, "ipAddress")).length;
    const conversionCount = stats.reduce((ac, cr) => {
      return ac + cr.target_statistics.length;
    }, 0);
    const conversionRate = conversionCount / sessionCount;
    const sourceTypes = groupByKey(stats, "sourceType");

    return {
      sessionCount: sessionCount,
      totalUserCount: totalUserCount,
      conversionCount: conversionCount,
      conversionRate: conversionRate,
      sourceTypes: sourceTypes,
      graphData: graphData,
    };
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "fail", message: "Something went wrong." });
  }
};
