const bcrypt = require("bcrypt");
const db = require("../../models/index");
const User = db.user;
const Product = db.product;
const UserProduct = db.userProduct;
const FloatingActionButton = db.floatingActionButton;
const moment = require("moment");

const saltRounds = 10;

exports.getUsers = async () => {
  const users = await User.findAll({
    attributes: {
      exclude: ["password"],
    },
  });
  return users;
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
    throw new Error(500);
  }
};

exports.getUser = async (req) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    return user;
  } catch (error) {
    throw new Error(500);
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
    throw new Error(500);
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
    throw new Error(500, "Error when get user products.");
  }
};

exports.revokeUserProduct = async (req, res) => {
  try {
    const userProduct = await UserProduct.update(
      { status: "Revoke" },
      {
        where: { id: req.params.userProductId },
      }
    );
    return userProduct;
  } catch (error) {
    throw new Error(500, "Error when revoke user product.");
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
        textContent: "Minible",
        size: 70,
        top: null,
        right: 20,
        bottom: 20,
        left: null,
        iconType: "font-awesome",
        icon: "fab facebook",
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
