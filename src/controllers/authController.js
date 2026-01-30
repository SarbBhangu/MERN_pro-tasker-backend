const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ==============================
// Create JWT Token
// ==============================
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ==============================
// Register User
// ==============================
// Creates a new user account
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1) Basic validation 
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name, email, and password",
      });
    }

    // 2) Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    // 3) Hash password (scramble it so we never store plain text)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4) Create user in the database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5) Send back safe user info + token 
    return res.status(201).json({
      message: "User registered successfully",
      token: generateToken(newUser._id),
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error.message);

    return res.status(500).json({
      message: "Server error during registration",
    });
  }
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
