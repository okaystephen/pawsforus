const ChatRoom = require("../models/ChatRoom");
const ChatRoomMember = require("../models/ChatRoomMember");

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
};

module.exports = chatService;
