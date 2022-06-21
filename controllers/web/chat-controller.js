const chatService = require("../../services/chat-service");

const chatController = {
  index: async (req, res) => {
    chatService.getRooms({user_id: req.user._id});
    res.render("chat", {
      layout: false,
    });
  },
};

module.exports = chatController;
