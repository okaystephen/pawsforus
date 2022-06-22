const ChatRoom = require("../models/ChatRoom");
const ChatRoomMember = require("../models/ChatRoomMember");
const Match = require("../models/Match");
const ObjectId = require("mongoose").Types.ObjectId;

const chatService = {
  /**
   *
   * @param {{status_type: string, user_ids: string[]}}
   */
  createRoom: async ({ status_type, user_ids }) => {
    const room = await ChatRoom.create({ status_type });

    const members = user_ids.map(
      (id) => new ChatRoomMember({ user_id: id, chat_room_id: room._id })
    );
    const result = await ChatRoomMember.bulkSave(members);

    return { room, members, result };
  },
  getMatchedPets: async ({ selectedPetId }) => {
    let matchedPets = await Match.aggregate()
      .match({ pet_id: ObjectId(selectedPetId) })
      .lookup({
        from: "matches",
        let: { pi: "$pet_id", lpi: "$liked_pet_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$$pi", "$liked_pet_id"] },
                  { $eq: ["$$lpi", "$pet_id"] },
                ],
              },
            },
          },
        ],
        as: "res",
      })
      .match({ res: { $ne: [] } })
      .exec();

    matchedPets = await Match.populate(matchedPets, {
      path: "pet_id liked_pet_id",
      populate: { path: "uploads" },
      options: { lean: true },
    });

    console.log({ matchedPets, selected_pet_id: selectedPetId });
    return { matchedPets };
  },
};

module.exports = chatService;
