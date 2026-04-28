const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createBooking,
  getBookings,
  updateBookingStatus,
    trackBookingByEmail,
} = require("../controllers/bookingController");

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create booking (Public)
 *     tags: [Booking]
 */
router.post("/", createBooking);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings (Admin)
 *     tags: [Booking]
 */
router.get("/", auth, getBookings);
router.get("/track", trackBookingByEmail);

/**
 * @swagger
 * /api/bookings/{id}:
 *   put:
 *     summary: Update booking status (Admin)
 *     tags: [Booking]
 */
router.put("/:id", auth, updateBookingStatus);

module.exports = router;