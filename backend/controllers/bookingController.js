const Booking = require("../models/Booking");

// CREATE BOOKING (PUBLIC)
exports.createBooking = async (req, res) => {
  try {
    const { name, email, date, time } = req.body;

    if (!name || !email || !date || !time) {
      return res.status(400).json({ msg: "Required fields missing" });
    }

    const booking = new Booking(req.body);
    await booking.save();

    res.status(201).json({ msg: "Booking created" });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// GET BOOKINGS (ADMIN)
exports.getBookings = async (req, res) => {
  try {
    const data = await Booking.find().sort({ createdAt: -1 });
    res.json(data);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

// UPDATE STATUS
exports.updateBookingStatus = async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};