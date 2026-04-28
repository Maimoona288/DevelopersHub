import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import logooo from "../assets/logooo.png";

const nav = [
  { path: "/admin/dashboard", label: "Dashboard", icon: "⬡" },
  { path: "/admin/services", label: "Services", icon: "⚙" },
  { path: "/admin/portfolio", label: "Portfolio", icon: "◫" },
  { path: "/admin/blogs", label: "Blog Posts", icon: "✎" },
  { path: "/admin/inquiries", label: "Inquiries", icon: "◎" },
  { path: "/admin/bookings", label: "Bookings", icon: "◷" },
  { path: "/admin/newsletter", label: "Newsletter", icon: "✉" },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); // optional
    navigate("/admin/login");
  };

  const navContent = (
    <div className="flex flex-col h-full">

      {/* LOGO */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100">
        <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
          <img src={logooo} alt="Logo" className="w-full h-full object-cover" />
        </div>

        {!collapsed && (
          <div>
            <p className="font-bold text-sm">
              Developers<span className="text-green-500">Hub</span>
            </p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Admin Panel
            </p>
          </div>
        )}
      </div>

      {/* NAV */}
      <nav className="flex-1 px-2 py-3 space-y-1">
        {nav.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? item.label : ""}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
                ${
                  isActive
                    ? "bg-green-50 text-green-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              <span className="w-5 text-center">{item.icon}</span>

              {!collapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="p-2 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
        >
          <LogOut size={16} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white border rounded"
      >
        ☰
      </button>

      {/* MOBILE BACKDROP */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-md md:hidden transition-transform
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {navContent}
      </div>

      {/* DESKTOP SIDEBAR */}
      <div
        className={`hidden md:flex flex-col h-screen bg-white border-r relative transition-all
        ${collapsed ? "w-[60px]" : "w-64"}`}
      >
        {navContent}

        {/* COLLAPSE BUTTON */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border rounded-full flex items-center justify-center"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </div>
    </>
  );
}