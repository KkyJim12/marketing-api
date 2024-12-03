module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    domains: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    duration: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    footerHtml: {
      type: Sequelize.TEXT('long'),
      allowNull: true,
    },
  });

  return Product;
};
