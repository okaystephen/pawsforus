const ChatRoom = require("../models/ChatRoom");
const ChatRoomMember = require("../models/ChatRoomMember");
const Match = require("../models/Match");
const Pet = require("../models/Pet");

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
  // TODO: find a way to get the chat room where this user belongs and also the match that caused the chat room to be created
  getRooms: async ({ user_id }) => {
    // Get all of my pets' IDs
    const myPetsIds = (await Pet.find({ owner_id: user_id })).map(
      (pet) => pet._id
    );

    let matchedPets = await Match.aggregate()
      .match({ pet_id: { $in: myPetsIds } })
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

    console.log({ matchedPets, myPetsIds });
    return { matchedPets };
  },
};

module.exports = chatService;
