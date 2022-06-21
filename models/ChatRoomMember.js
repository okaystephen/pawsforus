const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const chatRoomMemberSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chat_room_id: { type: mongoose.Schema.Types.ObjectId, ref: "ChatRoom" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

chatRoomMemberSchema.plugin(mongooseDelete, { deletedAt: true });

const ChatRoomMember = mongoose.model("ChatRoomMember", chatRoomMemberSchema);

module.exports = ChatRoomMember;
