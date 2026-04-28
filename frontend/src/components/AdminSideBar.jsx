import { Link, useLocation } from "react-router-dom";

const nav = [
  { path: "/admin", label: "Dashboard" },
  { path: "/admin/services", label: "Services" },
  { path: "/admin/blogs", label: "Blogs" },
  { path: "/admin/portfolio", label: "Portfolio" },
  { path: "/admin/inquiries", label: "Inquiries" },
  { path: "/admin/newsletter", label: "Newsletter" },
  { path: "/admin/bookings", label: "Bookings" },
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-white border-r p-4">
      <h1 className="font-bold text-xl mb-6">Admin Panel</h1>

      {nav.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`block p-2 rounded mb-1 ${
            location.pathname === item.path
              ? "bg-green-100 text-green-600"
              : "hover:bg-gray-100"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}