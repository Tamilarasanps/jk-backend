const mongoose = require("mongoose");
require("dotenv").config();
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb is Connected Successfully ✅");
  } catch (error) {
    console.log(error.message, "MongoDB connection failed ❌");
    process.exit(1);
  }
};
module.exports = connectDb;
