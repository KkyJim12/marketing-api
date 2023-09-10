module.exports = (sequelize, Sequelize) => {
  const FabContent = sequelize.define("fab_content", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    textColor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    textContent: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    destination: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    icon: {
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
    prebuiltContentId: {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "prebuilt_contents",
        key: "id",
        constraints: false,
      },
    },
  });

  return FabContent;
};
