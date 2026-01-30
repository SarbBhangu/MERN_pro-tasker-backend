// Load environment variables from .env file
require("dotenv").config();

// Import the Express app
const app = require("./app");

// Import database connection function
const connectDB = require("./config/db");

// Connect to MongoDB before starting the server
connectDB();

// Choose a port for the server to listen on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

