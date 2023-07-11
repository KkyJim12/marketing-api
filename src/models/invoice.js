module.exports = (sequelize, Sequelize) => {
  const Page = sequelize.define("invoice", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
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
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    productId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
        constraints: true,
      },
    },
  });

  return Page;
};
