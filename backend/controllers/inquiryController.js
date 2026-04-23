const Inquiry = require("../models/Inquiry");

// CREATE INQUIRY (PUBLIC)
exports.createInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const inquiry = new Inquiry({ name, email, message });
    await inquiry.save();

    res.status(201).json({ msg: "Inquiry submitted" });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// GET ALL (ADMIN)
exports.getInquiries = async (req, res) => {
  try {
    const data = await Inquiry.find().sort({ createdAt: -1 });
    res.json(data);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};