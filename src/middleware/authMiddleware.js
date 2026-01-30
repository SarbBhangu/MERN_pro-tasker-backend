const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ==============================
// Auth Middleware
// ==============================

const protect = async (req, res, next) => {
  let token;

  // 1) Check for token in Authorization header
  // Format: "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2) Extract token from header
      token = req.headers.authorization.split(" ")[1];

      // 3) Verify token using secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4) Find user and attach to request 
      req.user = await User.findById(decoded.id).select("-password");

      // 5) Move to the next step 
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  }

  // If no token was found
  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};

module.exports = { protect };
