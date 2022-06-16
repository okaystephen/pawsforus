const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const uploadSchema = new mongoose.Schema(
  {
    original_name: { type: String, required: true },
    filename: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

uploadSchema.plugin(mongooseDelete, { deletedAt: true });

const Upload = mongoose.model("Upload", uploadSchema);

module.exports = Upload;
