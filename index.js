const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { create } = require("express-handlebars");
const { port } = require("./config/app");
const logger = require("./middleware/logger");
const sampleRoutes = require("./routes/web/sample-routes");
const favicon = require("./middleware/favicon");

const app = express();

app.use(favicon);

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

// Mount routes here
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/samples", sampleRoutes);

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
