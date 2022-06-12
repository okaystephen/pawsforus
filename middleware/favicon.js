const path = require("path");
const favicon = require("serve-favicon");

module.exports = favicon(
  path.join(__dirname, "../public", "icons", "favicon.ico")
);
