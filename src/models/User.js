const mongoose = require("mongoose");

// ==============================
// User Schema
// ==============================
// This schema defines what a user looks like in our application.
// Each user will have a name, email, and password.

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // tells us when the user was created and updated
  }
);

// The model is how we talk to the database.
const User = mongoose.model("User", UserSchema);

module.exports = User;
