const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { create } = require("express-handlebars");
const mongoose = require("mongoose");
const { port } = require("./config/app");
const logger = require("./middleware/logger");
const sampleRoutes = require("./routes/web/sample-routes");
const favicon = require("./middleware/favicon");
const path = require("path");
const database = require("./config/database");
const app = express();

// favicon and static files
app.use(favicon);
app.use(express.static(path.resolve(__dirname, "public")));

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

// Mount routes here
app.get("/", (req, res) => {
  res.send("home page");
});

app.use("/samples", sampleRoutes);

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
