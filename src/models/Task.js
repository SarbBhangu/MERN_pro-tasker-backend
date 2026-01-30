const mongoose = require("mongoose");

// ==============================
// Task Schema
// ==============================
// A task belongs to a project.
// Tasks are nested under projects and track progress.

const TaskSchema = new mongoose.Schema(
  {
    // The project this task belongs to
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    // Task title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // task description
    description: {
      type: String,
      trim: true,
    },

    // Task status
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
    },
  },
  {
    timestamps: true,
  }
);

// Create Task model
const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
