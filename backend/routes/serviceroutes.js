const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const {
  getServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 */
router.get("/", getServices);

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create service (Admin)
 *     tags: [Services]
 */
router.post("/", auth,admin, createService);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Update service (Admin)
 *     tags: [Services]
 */
router.put("/:id", auth,admin, updateService);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Delete service (Admin)
 *     tags: [Services]
 */
router.delete("/:id", auth,admin, deleteService);

module.exports = router;