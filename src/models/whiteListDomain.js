module.exports = (sequelize, Sequelize) => {
  const whiteListDomain = sequelize.define("whitelist_domain", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    url: {
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
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
        constraints: true,
      },
    },
    userProductId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "user_products",
        key: "id",
        constraints: true,
      },
    },
  });

  return whiteListDomain;
};
