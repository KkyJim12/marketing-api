module.exports = (sequelize, Sequelize) => {
  const subPage = sequelize.define("sub_page", {
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
    sortValue: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT("long"),
      allowNull: true,
    },
    pageId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "pages",
        key: "id",
        constraints: true,
      },
    },
  });

  return subPage;
};
