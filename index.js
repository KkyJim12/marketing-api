const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 5000;
const db = require("./src/models/index");
const cors = require("cors");

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./src/routes/admin/images")(app);
require("./src/routes/admin/pages")(app);
require("./src/routes/admin/products")(app);
require("./src/routes/admin/settings")(app);
require("./src/routes/admin/users")(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
