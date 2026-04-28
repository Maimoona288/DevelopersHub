import { useEffect, useState } from "react";
import API from "../../Api/axios";
import AdminLayout from "/src/components/AdminLayout";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    blogs: 0,
    portfolio: 0,
    inquiries: 0,
    bookings: 0,
    newsletter: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [s, b, p, i, bo, n] = await Promise.all([
        API.get("/services"),
        API.get("/blogs"),
        API.get("/portfolio"),
        API.get("/inquiry"),
        API.get("/bookings"),
        API.get("/newsletter"),
      ]);

      setStats({
        services: s.data.length,
        blogs: b.data.length,
        portfolio: p.data.length,
        inquiries: i.data.length,
        bookings: bo.data.length,
        newsletter: n.data.length,
      });
    };

    fetchData();
  }, []);

  return (
     <AdminLayout>
    <div className="grid grid-cols-3 gap-4 p-6">
      {Object.entries(stats).map(([key, val]) => (
        <div key={key} className="bg-white p-4 border rounded-xl shadow-sm">
          <h3 className="text-gray-500 capitalize">{key}</h3>
          <p className="text-2xl font-bold">{val}</p>
        </div>
      ))}
    </div>
    </AdminLayout>
  );
}