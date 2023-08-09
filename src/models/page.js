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
    sortValue: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT("long"),
      allowNull: true,
    },
    icon: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Page;
};
