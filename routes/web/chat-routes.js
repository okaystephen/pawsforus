const express = require("express");
const chatController = require("../../controllers/web/chat-controller");
const ensureLoggedIn = require("../../middleware/ensure-logged-in");
const chatRoutes = express.Router();

chatRoutes.use(ensureLoggedIn);

chatRoutes.route("/").get(chatController.index);

module.exports = { router: chatRoutes, prefix: "/chat" };
