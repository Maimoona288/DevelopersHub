const Blog = require("../models/Blog");

// GET ALL
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// CREATE
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ msg: "Fields required" });
    }

    const blog = new Blog({ title, content });
    await blog.save();

    res.status(201).json(blog);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// UPDATE
exports.updateBlog = async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// DELETE
exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};