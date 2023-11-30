module.exports = (sequelize, Sequelize) => {
  const PrebuiltContent = sequelize.define("prebuilt_content", {
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
    textColor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    icon: {
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

  return PrebuiltContent;
};
