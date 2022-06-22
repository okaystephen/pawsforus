const chatService = require("../../services/chat-service");

const chatController = {
  index: async (req, res) => {
    const { matchedPets } = await chatService.getRooms({
      user_id: req.user._id,
    });
    const returnObj = {
      layout: false,
      data: {
        matchedPets: matchedPets.map((p) => ({
          ...p.liked_pet_id,
          matchedWith: p.pet_id.name,
        })),
      },
    };

    res.render("chat", returnObj);
  },
};

module.exports = chatController;
