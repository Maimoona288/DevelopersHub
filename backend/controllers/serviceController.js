const Service = require("../models/Service");

// GET ALL SERVICES
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// CREATE SERVICE
exports.createService = async (req, res) => {
  try {
    const { title, description, features, icon } = req.body;

    if (!title || !description) {
      return res.status(400).json({ msg: "Required fields missing" });
    }

    const service = new Service({ title, description, features, icon });
    await service.save();

    res.status(201).json(service);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// UPDATE SERVICE
exports.updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// DELETE SERVICE
exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ msg: "Service deleted" });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};