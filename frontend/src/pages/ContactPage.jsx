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
      <section className="py-24 text-center bg-gradient-to-r from-green-50 to-white">
        <h1 className="text-4xl md:text-6xl font-bold">
          Contact <span className="text-green-500">Us</span>
        </h1>

        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Let’s build something amazing together. We’re here to help your business grow.
        </p>
      </section>

      {/* CONTACT INFO */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow border text-center">
          <h3 className="font-bold text-lg">Email</h3>
          <p className="text-gray-500 mt-2">support@yourcompany.com</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border text-center">
          <h3 className="font-bold text-lg">Phone</h3>
          <p className="text-gray-500 mt-2">+92 300 1234567</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border text-center">
          <h3 className="font-bold text-lg">Location</h3>
          <p className="text-gray-500 mt-2">Gujranwala, Pakistan</p>
        </div>

      </section>

      {/* FORM + MAP */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          whileHover={{ scale: 1.01 }}
          className="bg-white p-8 rounded-2xl shadow border"
        >

          <h2 className="text-2xl font-bold mb-6">
            Send a Message
          </h2>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border p-3 rounded-lg mb-4"
            required
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border p-3 rounded-lg mb-4"
            required
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full border p-3 rounded-lg mb-4 h-32"
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

        {/* MAP */}
        <div className="rounded-2xl overflow-hidden shadow border">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18..."
            className="w-full h-full min-h-[350px]"
          ></iframe>
        </div>

      </section>

    </div>
      </Layout>
  );
}