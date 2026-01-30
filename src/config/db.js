const mongoose = require("mongoose");

// This function connects our app to MongoDB
const connectDB = async () => {
  try {
    // Try to connect using the connection string from .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } 
  
    catch (error) {
    console.error("MongoDB connection failed:", error.message);

    // Stop the app if database connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
