const userModel = require("../models/projects.model");

const uploadAllImages = async (req, res) => {
  try {
    const newImage = await userModel.create({ image: req.file.filename });
    res
      .status(200)
      .json({ message: "Image uploaded successfully", data: newImage });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllImages = async (req, res) => {
  try {
    const getImages = await userModel.find();
    res
      .status(200)
      .json({ message: "Images retrieved successfully", data: getImages });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAllImages, uploadAllImages };
