const fs = require("fs");
const path = require("path");

const apiDir = "../routes/api";
const absolutePath = path.join(__dirname, apiDir);

// Automatically loads all the routes from the routes/api directory.
const apiLoader = (app) => {
  fs.readdir(absolutePath, (err, files) => {
    files.forEach((file) => {
      const { router, prefix } = require(apiDir + "/" + file);
      app.use("/api" + prefix, router);
    });
  });
};

module.exports = apiLoader;
