import API from "./axios";

// GET ALL BOOKINGS (ADMIN)
export const getBookings = () => {
  const token = localStorage.getItem("token");

  return API.get("/bookings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// CREATE BOOKING (PUBLIC)
export const createBooking = (data) => API.post("/bookings", data);

// UPDATE STATUS (ADMIN)
export const updateBooking = (id, status) => {
  const token = localStorage.getItem("token");

  return API.put(
    `/bookings/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};