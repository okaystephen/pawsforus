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
    // Get all of my pets
    const myPetsIds = (await Pet.find({ owner_id: user_id })).map(
      (pet) => pet._id
    );

    // Get all of my pets that have tried matching
    const myPetMatches = await Match.find()
      .distinct("pet_id", { pet_id: { $in: myPetsIds } })
      .exec();

    const test = myPetMatches[0];
    // Then get the pets that matched with mine
    const compatibles = await Match.find({
      liked_pet_id: { $in: [test] },
    });

    const x = await Match.aggregate()
      .lookup({
        from: "matches",
        localField: "pet_id",
        foreignField: "liked_pet_id",
        as: "matches",
      })
      .match({ matches: { $ne: [] } })
      .project("matches")
      .exec();
    console.log(
      { x: x.map((_) => _.matches) },
      myPetMatches.length,
      compatibles.length
    );
  },
};

module.exports = chatService;
