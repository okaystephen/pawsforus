const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const matchSchema = new mongoose.Schema(
  {
    pet_id: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
    liked_pet_id: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

matchSchema.plugin(mongooseDelete, { deletedAt: true });

const Match = mongoose.model("Match", matchSchema);

module.exports = Match;
