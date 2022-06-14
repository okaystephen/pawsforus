const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { create } = require("express-handlebars");
const mongoose = require("mongoose");
const path = require("path");

const { port } = require("./config/app");
const database = require("./config/database");
const logger = require("./middleware/logger");
const favicon = require("./middleware/favicon");

const app = express();

// favicon and static files
app.use(favicon);
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.static(path.resolve(__dirname, "assets")));

// Logging
app.use(logger);

// HBS
const hbsExt = ".hbs";
const hbs = create({ extname: hbsExt });
app.engine(hbsExt, hbs.engine);
app.set("view engine", hbsExt);
app.set("views", "./views");

// Body parser, CORS
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cors());

// MongoDB
mongoose.connect(
  database.mongodb.url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log(`Connected to database at ${database.mongodb.url}`);
  }
);

// Loads routes automatically, just follow the export format of route files
require("./loaders/webLoader")(app);
//require("./loaders/apiLoader")(app);

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
