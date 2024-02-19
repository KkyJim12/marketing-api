const bcrypt = require("bcrypt");
const moment = require("moment");
const db = require("../../models/index");
const User = db.user;
const Product = db.product;
const UserProduct = db.userProduct;
const FloatingActionButton = db.floatingActionButton;
const saltRounds = 10;

exports.getUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    return users;
  } catch (error) {
    throw new Error(500, "Error when get users");
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create({
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password, saltRounds),
    });
    return user;
  } catch (error) {
    throw new Error(500, "Error when create a user");
  }
};

exports.getUser = async (req) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    return user;
  } catch (error) {
    throw new Error(500, "Error when get a user");
  }
};

exports.updateUser = async (req) => {
  try {
    const newData = {
      fullName: req.body.fullName,
      phone: req.body.phone,
    };

    if (req.body.password) {
      newData.password = bcrypt.hashSync(req.body.password, saltRounds);
    }

    const user = await User.update(newData, { where: { id: req.params.id } });
    return user;
  } catch (error) {
    throw new Error(500, "Error when update a user");
  }
};

exports.deleteUser = async (req) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    return;
  } catch (error) {
    throw new Error(500);
  }
};

exports.getUserProducts = async (req, res) => {
  try {
    const userProducts = await UserProduct.findAll({
      where: { userId: req.params.userId },
    });
    return userProducts;
  } catch (error) {
    throw new Error(500, "Error when update user's products");
  }
};

exports.extendUserProduct = async (req, res) => {
  try {
    const userProduct = await UserProduct.findOne({
      where: { id: req.params.userProductId },
    });

    const days = userProduct.duration;

    if (userProduct.status === "On going") {
      userProduct.endDate = moment(userProduct.endDate).add(days, "days");
    } else {
      userProduct.startDate = moment().format();
      userProduct.endDate = moment().add(days, "days");
      userProduct.status = "On going";
    }

    await userProduct.save();

    return userProduct;
  } catch (error) {
    throw new Error(500, "Error when extend a user's product");
  }
};

exports.revokeUserProduct = async (req, res) => {
  try {
    const userProduct = await UserProduct.update(
      { endDate: moment(), status: "Revoke" },
      {
        where: { id: req.params.userProductId },
      }
    );
    return userProduct;
  } catch (error) {
    throw new Error(500, "Error when revoke a user's product.");
  }
};

exports.addProductToUser = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.body.productId },
    });

    const userProduct = await UserProduct.create({
      name: product.name,
      type: product.type,
      price: product.price,
      domains: product.domains,
      duration: product.duration,
      startDate: moment().format(),
      endDate: moment().add(product.duration, "days"),
      status: "On going",
      userId: req.params.userId,
      productId: product.id,
    });

    // Floating Action Button
    if (product.type === "Floating Action Button") {
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
        userId: userProduct.userId,
        productId: userProduct.productId,
        userProductId: userProduct.id,
      });
    }

    return { userProduct };
  } catch (error) {
    console.log(error);
    throw new Error(500, "Error when update order status");
  }
};
