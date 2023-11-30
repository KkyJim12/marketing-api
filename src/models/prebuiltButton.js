module.exports = (sequelize, Sequelize) => {
  const PrebuiltButton = sequelize.define("prebuilt_button", {
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
    buttonStyle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    backgroundColor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bodyColor: {
      type: Sequelize.STRING,
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
    size: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    top: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
    },
    right: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
    },
    bottom: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
    },
    left: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
    },
    iconType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    icon: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    visibleOnPC: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    visibleOnTablet: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    visibleOnMobile: {
      type: Sequelize.BOOLEAN,
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

  return PrebuiltButton;
};
