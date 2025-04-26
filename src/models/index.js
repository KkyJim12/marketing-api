const dbConfig = require("../configs/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.product = require("./product.js")(sequelize, Sequelize);
db.page = require("./page.js")(sequelize, Sequelize);
db.subPage = require("./subPage.js")(sequelize, Sequelize);
db.setting = require("./setting.js")(sequelize, Sequelize);
db.admin = require("./admin.js")(sequelize, Sequelize);
db.order = require("./order.js")(sequelize, Sequelize);
db.userProduct = require("./userProduct.js")(sequelize, Sequelize);
db.prebuiltButton = require("./prebuiltButton.js")(sequelize, Sequelize);
db.prebuiltContent = require("./prebuiltContent.js")(sequelize, Sequelize);
// _______________
db.floatingActionButton = require("./floatingActionButton.js")(
  sequelize,
  Sequelize
);

db.product.hasMany(db.floatingActionButton, {
  foreignKey: "productId", 
  sourceKey: "id", 
});

db.floatingActionButton.belongsTo(db.product, {
  sourceKey: "id", 
  foreignKey: "productId", 
});
// __________________
db.fabContent = require("./fabContent.js")(sequelize, Sequelize);
db.whiteListDomain = require("./whiteListDomain.js")(sequelize, Sequelize);
db.statistic = require("./statistic.js")(sequelize, Sequelize);
db.targetStatistic = require("./targetStatistic.js")(sequelize, Sequelize);

db.userProduct.hasMany(db.whiteListDomain, {
  foreignKey: "userProductId", 
  sourceKey: "id", 
});

db.whiteListDomain.belongsTo(db.userProduct, {
  sourceKey: "id", 
  foreignKey: "userProductId", 
});

db.targetStatistic.hasOne(db.fabContent, {
  sourceKey: "fabContentId",
  foreignKey: "id",
});

db.fabContent.belongsTo(db.targetStatistic, {
  sourceKey: "id",
  foreignKey: "fabContentId",
});

db.statistic.hasMany(db.targetStatistic, {
  sourceKey: "sessionRef",
  foreignKey: "sessionRef",
  constraints: false,
});

db.page.hasMany(db.subPage, {
  constraints: true,
});

db.subPage.belongsTo(db.page, {
  constraints: true,
});

db.order.hasOne(db.product, {
  sourceKey: "productId",
  foreignKey: "id",
  constraints: true,
});

db.order.hasOne(db.user, {
  sourceKey: "userId",
  foreignKey: "id",
  constraints: true,
});

module.exports = db;
