import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Layout from "../components/Layout";

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
      const res = await axios.get(`${API}/bookings/track?email=${email}`);
      setBookings(res.data);
    } catch (err) {
      setError("No bookings found or server error");
    }

    setLoading(false);
  };

  const getStatusStyle = (status) => {
    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#f7f8f5] py-20 px-4">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Track Your <span className="text-green-500">Booking</span>
        </motion.h1>

        <p className="text-center text-gray-500 mt-2 mb-10">
          Enter your email to view your booking status
        </p>

        {/* SEARCH BAR (NO CARD) */}
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3">

          <input
            className="flex-1 border bg-white px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            placeholder="Enter your email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleTrack}
            className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition shadow-md hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
          >
            Track
          </button>

        </div>

        {/* STATUS */}
        {loading && (
          <p className="text-center mt-6 text-gray-500">Checking bookings...</p>
        )}

        {error && (
          <p className="text-center mt-6 text-red-500">{error}</p>
        )}

        {/* RESULTS */}
        <div className="max-w-6xl mx-auto mt-14 grid gap-6">

          {bookings.length === 0 && !loading && !error && (
            <p className="text-center text-gray-400">
              No bookings to show yet
            </p>
          )}

          {bookings.map((b, i) => (
            <motion.div
              key={b._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border rounded-2xl p-6 shadow-sm  transition"
            >

              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-bold">{b.name}</h2>
                  <p className="text-sm text-gray-400">{b.email}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                    b.status
                  )}`}
                >
                  {b.status}
                </span>
              </div>

              {/* DETAILS GRID */}
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-400 text-xs">DATE</p>
                  <p className="font-semibold text-gray-800">{b.date}</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-400 text-xs">TIME</p>
                  <p className="font-semibold text-gray-800">{b.time}</p>
                </div>

              </div>
              {/* STATUS MESSAGE */}
{b.status === "approved" && (
  <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
    ✅ Your booking is approved. Our team will contact you via email shortly.
  </div>
)}

{b.status === "pending" && (
  <div className="mt-4 p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm">
    ⏳ Your booking is under review. Please wait for approval.
  </div>
)}

{b.status === "rejected" && (
  <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
    ❌ Your booking was not approved. You can submit a new request.
  </div>
)}
              {/* FOOTER */}
              <div className="mt-4 text-xs text-gray-400">
                Booking ID: {b._id.slice(-6)}
              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </Layout>
  );
}