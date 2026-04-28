import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Layout from "../components/Layout";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get(`${API}/blogs`);
      setBlogs(res.data);
    };

    fetchBlogs();
  }, []);

  return (
      <Layout>
    <section className="py-24 px-6 bg-[#f7f8f5] relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[400px] h-[400px] bg-green-200/10 blur-[120px] rounded-full top-[-120px] right-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-green-100/10 blur-[100px] rounded-full bottom-[-100px] left-[-80px]" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="mb-14">
          <span className="text-green-600 text-xs font-bold uppercase tracking-wide">
            Latest Updates
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mt-3">
            Our <span className="text-green-500">Blog</span>
          </h2>

          <p className="text-gray-500 mt-4 max-w-xl">
            Insights, tutorials, and industry updates from our development team.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

          {blogs.slice(0, 6).map((b) => (

            <motion.div
              key={b._id}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-2xl border shadow-sm hover:shadow-xl overflow-hidden transition"
            >

              {/* TOP AREA */}
              <div className="p-6 border-b">

                <span className="text-xs text-green-600 font-semibold">
                  {b.author || "Admin"}
                </span>

                <h3 className="text-lg font-bold mt-2 line-clamp-2">
                  {b.title}
                </h3>

                <p className="text-gray-500 text-sm mt-3 line-clamp-3">
                  {stripHtml(b.content)}
                </p>

              </div>

              {/* FOOTER */}
              <div className="p-5 flex items-center justify-between">

                <span className="text-xs text-gray-400">
                  {new Date(b.createdAt).toDateString()}
                </span>

                <button className="text-green-600 text-sm font-semibold hover:underline">
                  Read More →
                </button>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
    </Layout>
  );
}

/* helper */
function stripHtml(html) {
  return html.replace(/<[^>]*>?/gm, "").slice(0, 120) + "...";
}