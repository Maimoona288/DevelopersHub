const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/portfolioController");

/**
 * @swagger
 * /api/portfolio:
 *   get:
 *     summary: Get all projects
 *     tags: [Portfolio]
 */
router.get("/", getProjects);

/**
 * @swagger
 * /api/portfolio:
 *   post:
 *     summary: Create project (Admin)
 *     tags: [Portfolio]
 */
router.post("/", auth, createProject);

/**
 * @swagger
 * /api/portfolio/{id}:
 *   put:
 *     summary: Update project (Admin)
 *     tags: [Portfolio]
 */
router.put("/:id", auth, updateProject);

/**
 * @swagger
 * /api/portfolio/{id}:
 *   delete:
 *     summary: Delete project (Admin)
 *     tags: [Portfolio]
 */
router.delete("/:id", auth, deleteProject);

module.exports = router;