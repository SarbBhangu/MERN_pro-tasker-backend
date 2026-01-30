const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ==============================
// Auth Routes
// ==============================
// These routes handle user registration and login.

router.post("/register", registerUser);
router.post("/login", loginUser);

// Test protected route
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    user: req.user,
  });
});


module.exports = router;