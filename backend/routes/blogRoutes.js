const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 */
router.get("/", getBlogs);

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create blog (Admin)
 *     tags: [Blogs]
 */
router.post("/", auth, createBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update blog (Admin)
 *     tags: [Blogs]
 */
router.put("/:id", auth, updateBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete blog (Admin)
 *     tags: [Blogs]
 */
router.delete("/:id", auth, deleteBlog);

module.exports = router;