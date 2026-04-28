import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Layout from "../components/Layout";

export default function ContactPage() {
  const API = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post(`${API}/inquiry`, form);

      setSuccess("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setSuccess("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-[#f7f8f5]">

        {/* HERO */}
        <section className="relative py-28 text-center text-white">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold">
              Contact <span className="text-green-400">Us</span>
            </h1>

            <p className="text-gray-200 mt-4 max-w-xl mx-auto">
              Let’s build something amazing together. We’re here to help your business grow.
            </p>
          </div>
        </section>

        {/* CONTACT CARDS */}
        <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">

          {[
            { title: "Email", value: "support@yourcompany.com", icon: "📧" },
            { title: "Phone", value: "+92 300 1234567", icon: "📞" },
            { title: "Location", value: "Gujranwala, Pakistan", icon: "📍" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="bg-white p-6 rounded-2xl shadow-md border text-center transition duration-300 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
            >
              <div className="text-3xl">{item.icon}</div>
              <h3 className="font-bold text-lg mt-2">{item.title}</h3>
              <p className="text-gray-500 mt-2">{item.value}</p>
            </motion.div>
          ))}

        </section>

        {/* FORM + IMAGE */}
        <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="rounded-2xl overflow-hidden shadow-lg transition duration-300 "
          >
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border transition duration-300 "
          >
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full border p-3 rounded-lg mb-4 h-32 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <p className="text-center text-sm text-green-600 mt-3">
                {success}
              </p>
            )}
          </motion.form>

        </section>

        {/* MAP */}
        <section className="max-w-6xl mx-auto px-6 pb-16">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="rounded-2xl overflow-hidden shadow-lg border transition duration-300 hover:shadow-[0_0_35px_rgba(34,197,94,0.5)]"
          >
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18..."
              className="w-full h-[400px]"
              loading="lazy"
            ></iframe>
          </motion.div>

        </section>

      </div>
    </Layout>
  );
}