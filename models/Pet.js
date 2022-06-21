const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const STATUSES = {
  FOR_MATCHING: "For matching",
  FOR_ADOPTION: "For adoption",
  FOR_SALE: "For sale",
};

const petSchema = new mongoose.Schema(
  {
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    birthdate: { type: Date, required: true },
    pet_type: { type: String, required: true },
    pet_type_others: { type: String },
    breed: { type: String },
    breed_others: { type: String },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    pet_likes: { type: String, required: true },
    pet_dislikes: { type: String, required: true },
    pet_allergies: { type: String, required: true },
    pet_vaccines: { type: String, required: true },
    status: {
      type: String,
      enum: [STATUSES.FOR_MATCHING, STATUSES.FOR_ADOPTION, STATUSES.FOR_SALE],
      required: true,
    },
    weight_kg: { type: String, required: true },
    match_count: { type: Number, default: 0, required: true },
    uploads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Upload" }],
    //docus: [{ type: mongoose.Schema.Types.ObjectId, ref: "Upload" }],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

petSchema.plugin(mongooseDelete, { deletedAt: true });

petSchema.statics.getStatuses = function () {
  return STATUSES;
};

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
