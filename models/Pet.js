const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

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
    status: {
      type: String,
      enum: ["For matching", "For adoption", "For sale"],
      required: true,
    },
    weight_kg: { type: String, required: true },
    uploads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Upload" }],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

petSchema.plugin(mongooseDelete, { deletedAt: true });
const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
