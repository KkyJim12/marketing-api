const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./src/models/index");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
const port = process.env.NODE_DOCKER_PORT || 8080;
const dsn = process.env.DSN_URL;

app.use(cors());
app.use(express.static("public"));

Sentry.init({
  dsn: dsn,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");

  const sqlDumpFile1 = fs.readFileSync("./src/storage/admins.sql", "utf8");
  const sqlDumpFile2 = fs.readFileSync("./src/storage/products.sql", "utf8");
  const sqlDumpFile3 = fs.readFileSync("./src/storage/settings.sql", "utf8");
  db.sequelize.query(sqlDumpFile1);
  db.sequelize.query(sqlDumpFile2);
  db.sequelize.query(sqlDumpFile3);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.get("/", (req, res) => {
  res.send("Server is running");
});

require("./src/crons/cron-jobs.js");

// Guest Routes
require("./src/routes/guest/auths")(app);
require("./src/routes/guest/products")(app);

// User Routes
require("./src/routes/user/e-commerce")(app);
require("./src/routes/user/my-product")(app);
require("./src/routes/user/pages")(app);
require("./src/routes/user/orders")(app);
require("./src/routes/user/images")(app);
require("./src/routes/user/settings")(app);

// Admin Routes
require("./src/routes/admin/images")(app);
require("./src/routes/admin/pages")(app);
require("./src/routes/admin/subPages")(app);
require("./src/routes/admin/products")(app);
require("./src/routes/admin/settings")(app);
require("./src/routes/admin/users")(app);
require("./src/routes/admin/orders")(app);
require("./src/routes/admin/prebuiltButtons")(app);
require("./src/routes/admin/prebuiltContents")(app);

app.use(Sentry.Handlers.errorHandler());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
