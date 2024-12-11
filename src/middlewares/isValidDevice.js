const DeviceDetector = require("node-device-detector");
const db = require("../models/index");
const FloatingActionButtton = db.floatingActionButton;

module.exports = isValidDomain = async (req, res, next) => {
  try {
    let isShow = true;
    const detector = new DeviceDetector({
      clientIndexes: true,
      deviceIndexes: true,
      deviceAliasCode: false,
    });

    const result = detector.detect(req.get("User-agent"));
    const thisDevice = result.device.type;

    const thisButton = await FloatingActionButtton.findOne({
      where: {
        userProductId: req.params.id,
      },
    });

    if (thisDevice === "desktop" && !thisButton.visibleOnPC) {
      isShow = false;
    }

    if (thisDevice === "tablet" && !thisButton.visibleOnTablet) {
      isShow = false;
    }

    if (thisDevice === "smartphone" && !thisButton.visibleOnMobile) {
      isShow = false;
    }

    if (isShow) {
      next();
    } else {
      res
        .status(500)
        .send({ message: "This device type is not active by button" });
    }
  } catch (error) {
    res.status(500).send({ message: "[pb04] Something went wrong" , reason : error.message });
  }
};
