import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const navItem =
    "text-gray-700 hover:text-green-400 transition duration-200 active:scale-95";

  return (
    <nav className="fixed top-0 w-full z-50 h-[65px] md:h-[70px] bg-white border-b border-gray-200 flex items-center px-4 sm:px-6 md:px-10">

      {/* LOGO */}
      <Link to="/" className="flex items-center gap-2 min-w-fit">
        <img
          src="/src/assets/logooo.png"
          alt="logo"
          className="w-13 h-12 sm:w-11 sm:h-11 object-contain"
        />

        <div className="flex flex-col leading-tight sm:items-center items-start sm:ml-0 -ml-1">
          <h1 className="font-extrabold text-lg tracking-wide flex items-center">
            Developers<span className="text-green-500">Hub</span>
          </h1>
          <span className="text-[10px] text-gray-400 tracking-[3px] uppercase">
            Corporation
          </span>
        </div>
      </Link>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex flex-1 justify-end lg:justify-center gap-6 lg:gap-10 text-sm font-medium">
        <Link to="/" className={navItem}>Home</Link>
        <Link to="/services" className={navItem}>Services</Link>
        <Link to="/portfolio" className={navItem}>Portfolio</Link>
        <Link to="/blog" className={navItem}>Blog</Link>
        <Link to="/contact" className={navItem}>Contact</Link>
      </div>

      {/* DESKTOP BUTTON */}
      <div className="hidden lg:flex items-center gap-3">
        <Link to="/booking">
          <button className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold shadow-md hover:scale-105 transition">
            Book Consultation
          </button>
        </Link>
      </div>

      {/* MOBILE BUTTON */}
      <button
        onClick={() => setMenuOpen(true)}
        className="md:hidden ml-auto p-2"
      >
        <div className="space-y-1.5">
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
        </div>
      </button>

      {/* BACKDROP */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-200 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* MOBILE MENU */}
      <div
        className={`fixed top-16 right-4 w-[220px] bg-white rounded-xl shadow-2xl z-50 border border-gray-100 transform transition-all duration-300 ${
          menuOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-2 text-sm font-medium gap-2">
          <Link to="/" className={navItem} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/services" className={navItem} onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/portfolio" className={navItem} onClick={() => setMenuOpen(false)}>Portfolio</Link>
          <Link to="/blog" className={navItem} onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link to="/contact" className={navItem} onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}