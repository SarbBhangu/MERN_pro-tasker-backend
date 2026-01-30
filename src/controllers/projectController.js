const Project = require("../models/Project");

// ==============================
// Create Project
// ==============================
const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Project name is required",
      });
    }

    const project = await Project.create({
      owner: req.user._id,
      name,
      description,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create project",
    });
  }
};

// ==============================
// Get My Projects
// ==============================
const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
};

// ==============================
// Get Project By ID
// ==============================
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to view this project",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch project",
    });
  }
};

// ==============================
// Update Project
// ==============================
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to update this project",
      });
    }

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;

    const updatedProject = await project.save();
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update project",
    });
  }
};

// ==============================
// Delete Project
// ==============================
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this project",
      });
    }

    await project.deleteOne();
    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete project",
    });
  }
};

module.exports = {
  createProject,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
