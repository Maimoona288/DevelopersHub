const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createInquiry,
  getInquiries,
} = require("../controllers/inquiryController");

/**
 * @swagger
 * /api/inquiry:
 *   post:
 *     summary: Submit inquiry (Public)
 *     tags: [Inquiry]
 */
router.post("/", createInquiry);

/**
 * @swagger
 * /api/inquiry:
 *   get:
 *     summary: Get all inquiries (Admin)
 *     tags: [Inquiry]
 */
router.get("/", auth, getInquiries);

module.exports = router;