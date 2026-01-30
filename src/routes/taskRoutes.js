const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  createTask,
  getTasksForProject,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router({ mergeParams: true });

// ==============================
// Task Routes 
// ==============================
// These routes are nested, meaning we need the projectId from the parent route.

router
  .route("/")
  .post(protect, createTask)
  .get(protect, getTasksForProject);

router.route("/:taskId").put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
