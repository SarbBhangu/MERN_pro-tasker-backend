const mongoose = require("mongoose");

// ==============================
// Project Schema
// ==============================
// A project belongs to a user and contains tasks.
// Only the owner can modify or delete it.

const ProjectSchema = new mongoose.Schema(
  {
    // The user who owns this project
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Project name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // project description
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create Project 
const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
