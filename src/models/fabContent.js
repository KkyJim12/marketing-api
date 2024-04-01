module.exports = (sequelize, Sequelize) => {
  const FabContent = sequelize.define("fab_content", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
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
    class: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    icon: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sortValue: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    productId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
        constraints: false,
      },
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
        constraints: false,
      },
    },
    userProductId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "user_products",
        key: "id",
        constraints: false,
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
