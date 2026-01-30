const express = require("express");
const taskRoutes = require("./taskRoutes");
const { protect } = require("../middleware/authMiddleware");
const {
  createProject,
  getMyProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const router = express.Router();

// ==============================
// Project Routes (Protected)
// ==============================
// All project routes require a logged-in user (JWT).

// Create a project + Get all my projects
router.route("/").post(protect, createProject).get(protect, getMyProjects);

// Nested task routes 
router.use("/:projectId/tasks", taskRoutes);

// Get/Update/Delete one project by ID
router
  .route("/:id")
  .get(protect, getProjectById)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

module.exports = router;
