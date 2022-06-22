const chatService = require("../../services/chat-service");
const matchService = require("../../services/match-service");
const petService = require("../../services/pet-service");

const chatController = {
  index: async (req, res) => {
    let selectedPet;

    let selected_pet_id = req.query.pet_id;
    if (selected_pet_id) {
      console.log("meron", selected_pet_id);
      selectedPet = await petService.getOneById(selected_pet_id);
    } else {
      console.log("wala", selected_pet_id);

      selectedPet = await petService.getOneOwnedByUser({
        user_id: req.user._id,
      });
    }

    const { matchedPets } = await matchService.getMatchedPets({
      selectedPetId: selectedPet._id,
    });

    const returnObj = {
      layout: false,
      data: {
        selectedPet,
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
