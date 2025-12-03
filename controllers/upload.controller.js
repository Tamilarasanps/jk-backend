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

const deleteImage = async (req, res) => {
  try {
    // Get the image ID from request params or body (assuming it's passed in the URL params)
    const imageId = req.params.id; // or req.body.id depending on your setup
    console.log("DELETE HIT", req.params.id);
    // Check if imageId exists in the request
    if (!imageId) {
      return res.status(400).json({ message: "Image ID is required" });
    }

    // Find and delete the image by its ID
    const deletedImage = await userModel.findByIdAndDelete(imageId);

    // If no document was deleted, return a 404 response
    if (!deletedImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({
      message: "Image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getAllImages, uploadAllImages, deleteImage };
