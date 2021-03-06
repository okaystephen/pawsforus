const fs = require("fs");
const path = require("path");

const webDir = "../routes/web";
const absolutePath = path.join(__dirname, webDir);

// Automatically loads all the routes from the routes/web directory.
const webLoader = (app) => {
  fs.readdir(absolutePath, { withFileTypes: true }, (err, dirents) => {
    const fileNames = dirents
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name);
    fileNames.forEach((file) => {
      const { router, prefix } = require(webDir + "/" + file);
      app.use(prefix, router);
    });
  });
};

module.exports = webLoader;
