import API from "./axios";

// GET ALL BOOKINGS (ADMIN)
export const getBookings = () => API.get("/bookings");

// CREATE BOOKING (PUBLIC)
export const createBooking = (data) => API.post("/bookings", data);

// UPDATE STATUS (ADMIN)
export const updateBooking = (id, status) =>
  API.put(`/bookings/${id}`, { status });

// TRACK BY EMAIL (PUBLIC)
export const trackBooking = (email) =>
  API.get(`/bookings/track?email=${email}`);