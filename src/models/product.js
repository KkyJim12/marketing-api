module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: Sequelize.STRING,
    },
    domains: {
      type: Sequelize.INTEGER.UNSIGNED,
    },
    duration: {
      type: Sequelize.INTEGER.UNSIGNED,
    },
    price: {
      type: Sequelize.INTEGER.UNSIGNED,
    },
    image: {
      type: Sequelize.STRING,
    },
  });

  return Product;
};
