const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const uploadSchema = new mongoose.Schema(
  {
    pet_id: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
    upload_id: { type: mongoose.Schema.Types.ObjectId, ref: "Upload" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

uploadSchema.plugin(mongooseDelete, { deletedAt: true });

const Upload = mongoose.model("Upload", uploadSchema);

module.exports = Upload;
