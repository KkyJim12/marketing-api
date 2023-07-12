const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.NODE_DOCKER_PORT || 8080;
const db = require("./src/models/index");
const cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(express.static("public"));

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");

  // const sqlDumpFile1 = fs.readFileSync("./src/storage/admins.sql", "utf8");
  // const sqlDumpFile2 = fs.readFileSync("./src/storage/products.sql", "utf8");
  // db.sequelize.query(sqlDumpFile1);
  // db.sequelize.query(sqlDumpFile2);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Guest Routes
require("./src/routes/guest/auths")(app);

// User Routes
require("./src/routes/user/e-commerce")(app);
require("./src/routes/user/pages")(app);
require("./src/routes/user/orders")(app);
require("./src/routes/user/images")(app);

// Admin Routes
require("./src/routes/admin/images")(app);
require("./src/routes/admin/pages")(app);
require("./src/routes/admin/subPages")(app);
require("./src/routes/admin/products")(app);
require("./src/routes/admin/settings")(app);
require("./src/routes/admin/users")(app);
require("./src/routes/admin/orders")(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
