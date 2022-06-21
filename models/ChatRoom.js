const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const Pet = require("./Pet");

const STATUSES = Pet.getStatuses();

const chatRoomSchema = new mongoose.Schema(
  {
    status_type: {
      type: String,
      enum: [STATUSES.FOR_MATCHING, STATUSES.FOR_ADOPTION, STATUSES.FOR_SALE],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

chatRoomSchema.plugin(mongooseDelete, { deletedAt: true });

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRoom;
