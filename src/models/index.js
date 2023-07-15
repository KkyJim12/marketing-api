const dbConfig = require("../configs/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

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

db.page.hasMany(db.subPage, {
  constraints: true,
});

db.subPage.belongsTo(db.page, {
  constraints: true,
});

module.exports = db;
