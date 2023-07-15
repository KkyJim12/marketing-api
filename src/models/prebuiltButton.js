module.exports = (sequelize, Sequelize) => {
  const PrebuiltButton = sequelize.define("prebuilt_button", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    backgroundColor: {
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
      allowNull: false,
    },
    right: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    bottom: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    left: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
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