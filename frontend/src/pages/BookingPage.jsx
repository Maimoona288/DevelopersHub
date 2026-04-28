import { useState, useContext } from "react";
import { AppContext } from "/src/context/AppContext.jsx";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function BookingPage() {
  const { createBooking } = useContext(AppContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    notes: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      await createBooking({
        name: form.name,
        email: form.email,
        date: form.date,
        time: form.time,
        notes: form.notes,
      });

      setSuccess(true);

      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        notes: "",
        date: "",
        time: "",
      });
    } catch (err) {
      setError("Booking failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Layout>
      <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
        {/* BACKGROUND */}
        <div className="absolute inset-0">
          <img
            src="src/assets/meeting.jpeg"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
          {/* LEFT TEXT */}
          <div className="text-white flex flex-col justify-center">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Book a <span className="text-green-400">Free Consultation</span>
            </h2>

            <p className="text-gray-300 mt-4">
              Share your idea with us and we’ll help you turn it into a scalable
              product.
            </p>

            {/* EXTRA INFO */}
            <div className="mt-8 space-y-3 text-gray-300 text-sm">
              <p>✔ Response within 24 hours</p>
              <p>✔ Free project consultation</p>
              <p>✔ Full-stack development support</p>
            </div>
          </div>

          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-2xl space-y-4"
          >
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full p-3 rounded bg-white/10 text-white outline-none"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full p-3 rounded bg-white/10 text-white outline-none"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 rounded bg-white/10 text-white outline-none"
            />

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full p-3 rounded bg-white/10 text-white outline-none"
            >
              <option value="">Select Service</option>
              <option>Web Development</option>
              <option>Mobile App</option>
              <option>AI Solution</option>
              <option>UI/UX Design</option>
            </select>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Project details..."
              className="w-full p-3 rounded bg-white/10 text-white outline-none h-24"
            />

            {/* DATE TIME */}
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="p-3 rounded bg-white/10 text-white outline-none"
                required
              />

              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="p-3 rounded bg-white/10 text-white outline-none"
                required
              />
            </div>

            {/* STATUS */}
            {success && (
              <p className="text-green-400 text-sm">
                Booking submitted successfully!
              </p>
            )}

            {error && <p className="text-red-400 text-sm">{error}</p>}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-400 text-black py-3 rounded font-bold hover:scale-105 transition"
            >
              {loading ? "Sending..." : "Book Now"}
            </button>
            <Link
              to="/track-booking"
              className="block text-center w-full mt-3 border border-green-400 text-green-400 py-3 rounded font-semibold hover:bg-green-400 hover:text-black transition"
            >
              Track Your Booking →
            </Link>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
}
