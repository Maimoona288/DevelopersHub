const Newsletter = require("../models/Newsletter");
const sendEmail = require("../utils/sendEmail");

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

// SEND NEWSLETTER TO ALL (NEW)
exports.sendNewsletterToAll = async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ msg: "Subject and message required" });
    }

    const subscribers = await Newsletter.find();

    for (let user of subscribers) {
      await sendEmail(user.email, subject, message);
    }

    res.json({
      msg: `Newsletter sent to ${subscribers.length} subscribers`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};