import { useEffect, useState } from "react";
import API from "../../Api/axios";
import AdminLayout from "/src/components/AdminLayout";
import {
  Briefcase,
  FileText,
  Image,
  Mail,
  Calendar,
  Users,
  TrendingUp,
} from "lucide-react";

const cards = [
  { key: "services", label: "Services", icon: Briefcase, color: "bg-blue-500" },
  { key: "blogs", label: "Blogs", icon: FileText, color: "bg-purple-500" },
  { key: "portfolio", label: "Portfolio", icon: Image, color: "bg-pink-500" },
  { key: "inquiries", label: "Inquiries", icon: Mail, color: "bg-yellow-500" },
  { key: "bookings", label: "Bookings", icon: Calendar, color: "bg-green-500" },
  { key: "newsletter", label: "Subscribers", icon: Users, color: "bg-indigo-500" },
];

// simulate growth %
const getGrowth = () => Math.floor(Math.random() * 20) + 5;

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [growth, setGrowth] = useState({});
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [s, b, p, i, bo, n] = await Promise.all([
          API.get("/services"),
          API.get("/blogs"),
          API.get("/portfolio"),
          API.get("/inquiry"),
          API.get("/bookings"),
          API.get("/newsletter"),
        ]);

        const data = {
          services: s.data.length,
          blogs: b.data.length,
          portfolio: p.data.length,
          inquiries: i.data.length,
          bookings: bo.data.length,
          newsletter: n.data.length,
        };

        setStats(data);

        // fake growth %
        const growthData = {};
        Object.keys(data).forEach((k) => {
          growthData[k] = getGrowth();
        });
        setGrowth(growthData);

        // fake recent activity
        setActivity([
          { text: "New booking received", time: "2 min ago" },
          { text: "New inquiry submitted", time: "10 min ago" },
          { text: "Blog published", time: "1 hour ago" },
          { text: "New subscriber joined", time: "2 hours ago" },
          { text: "Portfolio item added", time: "Today" },
        ]);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 text-sm">
            Monitor performance and activity
          </p>
        </div>

        {/* CARDS */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map(({ key, label, icon: Icon, color }) => (
            <div
              key={key}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-gray-200 via-transparent to-gray-200 hover:from-blue-400/40 hover:to-purple-400/40 transition-all duration-300"
            >
              <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:scale-[1.02]">

                {/* TOP */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 ${color}`}
                  >
                    <Icon size={18} />
                  </div>

                  {!loading && (
                    <div className="flex items-center text-green-600 text-xs font-semibold opacity-80 group-hover:opacity-100">
                      <TrendingUp size={14} className="mr-1" />
                      +{growth[key]}%
                    </div>
                  )}
                </div>

                {/* TEXT */}
                <div className="mt-4">
                  <h3 className="text-sm text-gray-500">{label}</h3>

                  {loading ? (
                    <div className="h-6 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
                  ) : (
                    <p className="text-2xl font-bold text-gray-800 tracking-tight">
                      {stats[key]}
                    </p>
                  )}

                  {!loading && (
                    <p className="text-xs text-gray-400 mt-1">
                      Compared to last week
                    </p>
                  )}
                </div>

                {/* GLOW */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-transparent blur-xl"></div>

              </div>
            </div>
          ))}
        </div>

        {/* LOWER SECTION */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* SUMMARY */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Today’s Summary
            </h2>

            <ul className="space-y-2 text-sm text-gray-600">
              <li>📩 {stats.inquiries || 0} new inquiries</li>
              <li>📅 {stats.bookings || 0} total bookings</li>
              <li>👥 {stats.newsletter || 0} subscribers</li>
            </ul>
          </div>

          {/* ACTIVITY */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Recent Activity
            </h2>

            <div className="space-y-3">
              {activity.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between text-sm text-gray-600 border-b last:border-none pb-2"
                >
                  <span>{item.text}</span>
                  <span className="text-gray-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}