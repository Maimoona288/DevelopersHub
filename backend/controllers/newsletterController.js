const Newsletter = require("../models/Newsletter");

// ADD EMAIL
exports.subscribeEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Email is required" });
    }

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(409).json({ msg: "Email already subscribed" });
    }

    const subscriber = new Newsletter({ email });
    await subscriber.save();

    res.status(201).json({ msg: "Subscribed successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// GET ALL (ADMIN)
exports.getSubscribers = async (req, res) => {
  try {
    const data = await Newsletter.find().sort({ createdAt: -1 });
    res.json(data);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};