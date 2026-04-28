import { useState } from "react";
import axios from "axios";
import { Mail, Globe, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { subscribeEmail } from "../Api/newsletter";

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // newsletter state
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubscribe = async () => {
  if (!email) return;

  try {
    setStatus("loading");

    await subscribeEmail(email);

    setStatus("success");
    setEmail("");
  } catch (err) {
    console.error(err);
    setStatus("error");
  }
};

  return (
    <footer className="bg-black text-white px-6 py-20 relative overflow-hidden">
      {/* glow */}
      <div className="absolute w-[400px] h-[400px] bg-green-500/20 blur-[120px] rounded-full top-[-100px] right-[-120px]" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 relative z-10">
        {/* COMPANY */}
        <div>
          <h3 className="font-bold text-xl">DevelopersHub</h3>

          <p className="text-gray-400 text-sm mt-3">
            Building scalable software, AI systems, and digital products.
          </p>

          <div className="mt-5 space-y-2 text-sm text-gray-400">
            <p className="flex items-center gap-2">
              <Globe size={16} className="text-green-400" />
              developershubcorp.com
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} className="text-green-400" />
              hr@developershubcorp.com
            </p>
          </div>

          {/* SOCIAL */}
          <div className="flex gap-3 mt-5">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer" 
              className="p-2 rounded-full bg-green-400 text-black hover:scale-110 transition"
            >
              <FaLinkedin size={16} />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer" 
              className="p-2 rounded-full bg-green-400 text-black hover:scale-110 transition"
            >
              <FaGithub size={16} />
            </a>
          </div>
        </div>

        {/* NAVIGATION */}
        <div>
          <h4 className="font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li onClick={() => scrollTo("about")} className="cursor-pointer hover:text-green-400">About</li>
            <li onClick={() => scrollTo("services")} className="cursor-pointer hover:text-green-400">Services</li>
            <li onClick={() => scrollTo("portfolio")} className="cursor-pointer hover:text-green-400">Portfolio</li>
            <li onClick={() => scrollTo("booking")} className="cursor-pointer hover:text-green-400">Booking</li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-green-400 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-green-400 cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h4 className="font-semibold mb-4">Stay Updated</h4>

          <p className="text-gray-400 text-sm mb-4">
            Get insights, updates, and tech trends.
          </p>

          <div className="flex items-center bg-white/10 border border-white/20 rounded-full overflow-hidden">
            <input
              type="email" e
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 bg-transparent text-sm outline-none"
              placeholder="Enter email"
            />

            <button
              onClick={handleSubscribe}
              className="bg-gradient-to-r from-green-400 to-green-600 px-4 py-2 text-black"
            >
              <ArrowRight size={16} />
            </button>
          </div>

          {/* STATUS */}
          {status === "success" && (
            <p className="text-green-400 text-xs mt-2">
              Subscribed successfully!
            </p>
          )}

          {status === "error" && (
            <p className="text-red-400 text-xs mt-2">
              Something went wrong
            </p>
          )}

          {/* CTA */}
          <button
            onClick={() => scrollTo("booking")}
            className="mt-5 w-full bg-green-400 text-black py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            Subscribe
          </button>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-16 relative z-10">
        © 2026 DevelopersHub Corporation. All rights reserved.
      </div>
    </footer>
  );
}