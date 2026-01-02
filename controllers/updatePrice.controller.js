import priceModal from "../models/priceing.modal.js";

export const addNewPrice = async (req, res) => {
  try {
    // Destructure the fields from the request body
    const { basicPackage, standardPackage, premiumPackage } = req.body;

    // Check if all fields are provided
    if (!basicPackage || !standardPackage || !premiumPackage) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the fields",
      });
    }

    // Use upsert to ensure only one pricing document exists
    const updatedPrice = await priceModal.findOneAndUpdate(
      {}, // Empty query will find the first document (if it exists)
      {
        basicPackage,
        standardPackage,
        premiumPackage,
      },
      {
        new: true, // Return the updated document
        upsert: true, // If no document is found, insert a new one
        runValidators: true, // Ensure validators are run on the new data
      }
    );

    // Send success response
    res.status(200).json({
      success: true,
      message: updatedPrice
        ? "Price Updated successfully"
        : "Price Added successfully",
      data: updatedPrice,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to add or update price",
    });
  }
};

export const getPrice = async (req, res) => {
  try {
    const prices = await priceModal.find();
    if (!prices || prices.length === 0) {
      res.status(404).json({
        success: false,
        message: "Price is not there",
      });
    }
    res.status(200).json({
      success: true,
      message: "Price get successfully",
      data: prices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch pricing data",
    });
  }
};

export const updatePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { basicPackage, standardPackage, premiumPackage } = req.body;
    const updatePrice = await priceModal.findByIdAndUpdate(
      id,
      {
        basicPackage,
        premiumPackage,
        standardPackage,
      },
      { new: true }
    );
    if (!updatePrice) {
      res.status(404).json({
        success: false,
        message: "Price not found",
      });
    }
    res.status(201).json({
      success: true,
      message: "price Updates successfuly",
      data: updatePrice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Update pricing data",
      error: error.message,
    });
  }
};
