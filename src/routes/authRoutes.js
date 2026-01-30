const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// ==============================
// Auth Routes
// ==============================
// These routes handle user registration and login.

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;