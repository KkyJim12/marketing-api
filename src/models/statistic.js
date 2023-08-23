module.exports = (sequelize, Sequelize) => {
  const Statistic = sequelize.define("statistic", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    ipAddress: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sourceUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    sourceType: {
      type: Sequelize.STRING,
      allowNull: false,
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

  return Statistic;
};
