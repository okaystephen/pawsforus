const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { create } = require("express-handlebars");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const { port } = require("./config/app");
const database = require("./config/database");
const logger = require("./middleware/logger");
const favicon = require("./middleware/favicon");
const authService = require("./services/auth-service");

const app = express();

// favicon and static files
app.use(favicon);
app.use(express.static(path.resolve(__dirname, "assets")));
app.use('/storage', express.static(path.resolve(__dirname, 'storage/app/public')))
// Logging
app.use(logger);

// HBS
const hbsExt = ".hbs";
const hbs = create({
  extname: hbsExt,
  helpers: {
    // Use this helper on <select> elements to retain option when submitting form data
    select: function (value, input) {
      return value === input ? ' selected' : '';
    },
    match: function (arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
    notmatch: function (arg1, arg2, options) {
      return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
    },
    dateFormat: require('handlebars-dateformat'),
    equals: function (arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
  }
});
app.engine(hbsExt, hbs.engine);
app.set("view engine", hbsExt);
app.set("views", "./views");

// Body parser, CORS
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cors());

// Session
app.use(
  session({
    secret: "s",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: database.mongodb.url }),
  })
);

// Authentication
app.use(authService.initialize()).use(authService.session());

// MongoDB
mongoose.connect(
  database.mongodb.url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) return err;

    console.log(`Connected to database at ${database.mongodb.url}`);
  }
);

// Loads routes automatically, just follow the export format of route files
require("./loaders/webLoader")(app);
require("./loaders/apiLoader")(app);

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
