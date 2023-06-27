module.exports = (sequelize, Sequelize) => {
  const Page = sequelize.define("page", {
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
    sortType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sortNumber: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    mainPageId: {
      type: Sequelize.UUIDV4,
      references: "pages",
      referencesKey: "id",
      allowNull: true,
    },
    content: {
      type: Sequelize.TEXT("long"),
      allowNull: true,
    },
  });

  return Page;
};
