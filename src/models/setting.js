module.exports = (sequelize, Sequelize) => {
  const Page = sequelize.define("setting", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    eCommercePage: {
      type: Sequelize.Text("long"),
      allowNull: true,
    },
    myProductPage: {
      type: Sequelize.Text("long"),
      allowNull: true,
    },
    orderHistoryPage: {
      type: Sequelize.Text("long"),
      allowNull: true,
    },
  });

  return Page;
};
