import { useState } from "react";
import axios from "axios";

export default function TrackBooking() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_API_URL;

  const handleTrack = async () => {
    setLoading(true);
    setError("");
    setBookings([]);

    try {
      const res = await axios.get(
        `${API}/bookings/track?email=${email}`
      );

      setBookings(res.data);
    } catch (err) {
      setError("No bookings found or server error");
    }

    setLoading(false);
  };

  return (
    <div className="py-20 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Track Your Booking
      </h1>

      {/* INPUT */}
      <input
        className="border p-3 w-full"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleTrack}
        className="bg-green-500 text-white px-4 py-2 mt-4"
      >
        Track
      </button>

      {/* LOADING */}
      {loading && (
        <p className="mt-4 text-gray-500">Loading...</p>
      )}

      {/* ERROR */}
      {error && (
        <p className="mt-4 text-red-500">{error}</p>
      )}

      {/* RESULTS */}
      <div className="mt-8 space-y-4">

        {bookings.length === 0 && !loading && !error && (
          <p className="text-gray-400">
            No bookings to show
          </p>
        )}

        {bookings.map((b) => (
          <div key={b._id} className="border p-4 rounded">

            <p><b>Name:</b> {b.name}</p>
            <p><b>Date:</b> {b.date}</p>
            <p><b>Time:</b> {b.time}</p>

            <p className="mt-2">
              <b>Status:</b>{" "}
              <span
                className={
                  b.status === "approved"
                    ? "text-green-600"
                    : b.status === "rejected"
                    ? "text-red-600"
                    : "text-yellow-500"
                }
              >
                {b.status}
              </span>
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}