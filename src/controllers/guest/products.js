const { storeEvent } = require("../../services/guest/products");

exports.storeEvent = async (req, res) => {
  try {
    const event = await storeEvent(req, res);
    res.status(200).send({
      status: "success",
      data: event,
      message: "Store event success.",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "fail", data: null, message: "Something went wrong." });
  }
};
