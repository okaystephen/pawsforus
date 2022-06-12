const morgan = require("morgan");
const { env } = require("../config/app");

const logger = morgan(env === "development" ? "dev" : "common");

module.exports = logger;
