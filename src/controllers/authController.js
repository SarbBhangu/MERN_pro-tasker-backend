const User = require("../models/User");

// ==============================
// Register User
// ==============================
// This function will handle creating a new user account
const registerUser = async (req, res) => {
  res.status(200).json({
    message: "Register route works",
  });
};

// ==============================
// Login User
// ==============================
// This function will handle logging in an existing user
const loginUser = async (req, res) => {
  res.status(200).json({
    message: "Login route works",
  });
};

module.exports = {
  registerUser,
  loginUser,
};
