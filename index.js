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

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");

  const sqlDumpFile = fs.readFileSync("./src/storage/admins.sql", "utf8");
  db.sequelize.query(sqlDumpFile);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Guest Routes
require("./src/routes/guest/auths")(app);

// User Routes
require("./src/routes/user/e-commerce")(app);
require("./src/routes/user/pages")(app);

// Admin Routes
require("./src/routes/admin/images")(app);
require("./src/routes/admin/pages")(app);
require("./src/routes/admin/subPages")(app);
require("./src/routes/admin/products")(app);
require("./src/routes/admin/settings")(app);
require("./src/routes/admin/users")(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
