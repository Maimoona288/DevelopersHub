const Portfolio = require("../models/Portfolio");

// GET ALL
exports.getProjects = async (req, res) => {
  try {
    const data = await Portfolio.find().sort({ createdAt: -1 });
    res.json(data);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// CREATE
exports.createProject = async (req, res) => {
  try {
    const project = new Portfolio(req.body);
    await project.save();
    res.status(201).json(project);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// UPDATE
exports.updateProject = async (req, res) => {
  try {
    const updated = await Portfolio.findByIdAndUpdate(
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
exports.deleteProject = async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};