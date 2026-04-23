const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    date: {
      type: String, // keep simple (YYYY-MM-DD)
      required: true,
    },
    time: {
      type: String, // keep simple (HH:mm)
      required: true,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);