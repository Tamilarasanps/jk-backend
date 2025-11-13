const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  image: String,
});

module.exports = mongoose.model("files", projectSchema);
