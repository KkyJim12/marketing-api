const moment = require("moment");
const db = require("../../models/index");
const Order = db.order;
const User = db.user;
const Product = db.product;
const UserProduct = db.userProduct;
const FloatingActionButton = db.floatingActionButton;

exports.getOrders = async () => {
  try {
    const orders = await Order.findAll({
      include: [{ model: User }, { model: Product }],
    });
    return orders;
  } catch (error) {
    throw new Error(500, "Error when get orders");
  }
};

exports.cancelOrder = async (req) => {
  try {
    const order = await Order.update(
      { status: "Cancel" },
      { where: { id: req.params.id } }
    );
    return order;
  } catch (error) {
    throw new Error(500, "Error when update order status");
  }
};

exports.declineOrder = async (req) => {
  try {
    const order = await Order.update(
      { status: "Wait for payment" },
      { where: { id: req.params.id } }
    );
    return order;
  } catch (error) {
    throw new Error(500, "Error when update order status");
  }
};

exports.acceptOrder = async (req) => {
  try {
    const order = await Order.update(
      { status: "Success" },
      { where: { id: req.params.id } }
    );

    const thisOrder = await Order.findOne({ where: { id: req.params.id } });

    if (thisOrder.type === "Extends") {
      const userProduct = await UserProduct.findOne({
        where: { id: thisOrder.name },
      });

      if (userProduct.status === "Expired") {
        await UserProduct.update(
          {
            startDate: moment().format(),
            endDate: moment().add(thisOrder.duration, "days"),
            paymentDate: null,
            status: "On going",
          },
          {
            where: { id: thisOrder.name },
          }
        );
      } else {
        await UserProduct.update(
          {
            paymentDate: null,
            endDate: moment(userProduct.endDate).add(
              thisOrder.duration,
              "days"
            ),
          },
          {
            where: { id: thisOrder.name },
          }
        );
      }
      return { userProduct };
    } else {
      const userProduct = await UserProduct.create({
        name: thisOrder.name,
        type: thisOrder.type,
        price: thisOrder.price,
        domains: thisOrder.domains,
        duration: thisOrder.duration,
        startDate: moment().format(),
        endDate: moment().add(thisOrder.duration, "days"),
        status: "On going",
        userId: thisOrder.userId,
        productId: thisOrder.productId,
      });

      // Floating Action Button
      if (thisOrder.type === "Floating Action Button") {
        await FloatingActionButton.create({
          buttonStyle: "Rounded Button",
          backgroundColor: "#3b82f6",
          bodyColor: "#ffffff",
          textColor: "#f5f5f5",
          textContent: "ติดต่อเรา",
          size: 70,
          top: null,
          right: 20,
          bottom: 20,
          left: null,
          iconType: "font-awesome",
          icon: "fab fa-facebook",
          visibleOnPC: true,
          visibleOnTablet: true,
          visibleOnMobile: true,
          userId: thisOrder.userId,
          productId: thisOrder.productId,
          userProductId: userProduct.id,
        });
      }
      return { userProduct };
    }
  } catch (error) {
    throw new Error(500, "Error when update order status");
  }
};
