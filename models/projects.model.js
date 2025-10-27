const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String }, // optional: file name or project name
  file: { type: Buffer, required: true }, // store actual file
  contentType: { type: String, required: true }, // MIME type
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", projectSchema);
