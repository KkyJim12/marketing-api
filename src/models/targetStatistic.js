module.exports = (sequelize, Sequelize) => {
  const targetStatistic = sequelize.define("target_statistic", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    currentUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sessionRef: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fabContentId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "fab_contents",
        key: "id",
        constraints: true,
      },
    },
  });

  return targetStatistic;
};
