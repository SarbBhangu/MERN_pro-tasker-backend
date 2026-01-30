const Task = require("../models/Task");
const Project = require("../models/Project");

// ==============================
// Verify Project Ownership
// ==============================
// Makes sure the project exists and belongs to the logged-in user.
const getOwnedProject = async (projectId, userId) => {
  const project = await Project.findById(projectId);

  if (!project) {
    return null;
  }

  if (project.owner.toString() !== userId.toString()) {
    return "FORBIDDEN";
  }

  return project;
};

// ==============================
// Create Task
// ==============================
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { projectId } = req.params;

    if (!title) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const projectCheck = await getOwnedProject(projectId, req.user._id);

    if (projectCheck === null) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (projectCheck === "FORBIDDEN") {
      return res.status(403).json({ message: "Not authorized for this project" });
    }

    const task = await Task.create({
      project: projectId,
      title,
      description,
      status, // optional; schema default is "To Do"
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
    });
  }
};

// ==============================
// Get Tasks for a Project
// ==============================
const getTasksForProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const projectCheck = await getOwnedProject(projectId, req.user._id);

    if (projectCheck === null) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (projectCheck === "FORBIDDEN") {
      return res.status(403).json({ message: "Not authorized for this project" });
    }

    const tasks = await Task.find({ project: projectId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};

// ==============================
// Update Task
// ==============================
const updateTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    const projectCheck = await getOwnedProject(projectId, req.user._id);

    if (projectCheck === null) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (projectCheck === "FORBIDDEN") {
      return res.status(403).json({ message: "Not authorized for this project" });
    }

    const task = await Task.findOne({ _id: taskId, project: projectId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
    });
  }
};

// ==============================
// Delete Task
// ==============================
const deleteTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    const projectCheck = await getOwnedProject(projectId, req.user._id);

    if (projectCheck === null) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (projectCheck === "FORBIDDEN") {
      return res.status(403).json({ message: "Not authorized for this project" });
    }

    const task = await Task.findOne({ _id: taskId, project: projectId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
    });
  }
};

module.exports = {
  createTask,
  getTasksForProject,
  updateTask,
  deleteTask,
};
