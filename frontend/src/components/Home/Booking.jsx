import { useState, useContext } from "react";
import { AppContext } from "/src/context/AppContext.jsx";
import { Link } from "react-router-dom";
export default function Booking() {
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
    setError("");
    setSuccess(false);

    try {
     await createBooking({
  name: form.name,
  email: form.email,
  date: form.date,
  time: form.time,
  notes: form.message, // IMPORTANT FIX
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
      console.error(err);
      setError("Booking failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <section 
     id="booking"
    className="relative py-20 md:py-28 px-4 sm:px-6 overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          // src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
          src="src/assets/meeting.jpeg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
        {/* LEFT TEXT */}
        <div className="text-white">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Let’s Build Something{" "}
            <span className="text-green-400 justify-center ">
              Great & Scalable
            </span>
          </h2>

          <p className="text-gray-300 mt-4">
            Submit your project details and our team will contact you within 24
            hours.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur border border-white/20 p-6 md:p-8 rounded-2xl space-y-4"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full p-3 rounded bg-white/10 text-white outline-none"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-3 rounded bg-white/10 text-white outline-none"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-3 rounded bg-white/10 text-white outline-none"
          />

          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white/20 text-green-500 outline-none"
          >
            <option value="">Select Service</option>
            <option>Web Development</option>
            <option>Mobile App</option>
            <option>AI Solution</option>
          </select>

          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Project Details"
            className="w-full p-3 rounded bg-white/10 text-white outline-none"
          />

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
            <p className="text-green-400 text-sm">Booking sent successfully!</p>
          )}

          {error && <p className="text-red-400 text-sm">{error}</p>}

       
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-400 text-black py-3 rounded font-bold hover:scale-105 transition"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>

          <Link
            to="/track-booking"
            className="block text-center w-full mt-3 border border-green-400 text-green-400 py-3 rounded font-semibold hover:bg-green-400 hover:text-black transition"
          >
            Track Your Booking →
          </Link>
        </form>
      </div>
    </section>
  );
}
