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

  const featured = blogs[0];
  const rest = blogs.slice(1, 7);

  //  Image pool (different images for each blog)
  const fallbackImages = [
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    // "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  ];

  // Stable image generator
  function getBlogImage(blog, index) {
    if (blog.image) return blog.image;
    return fallbackImages[index % fallbackImages.length];
  }

  return (
    <Layout>
      <div className="bg-white">

        {/* HEADER */}
        <section className="relative py-20 px-6 overflow-hidden">

          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
            className="absolute inset-0 w-full h-full object-cover"
            alt="blog background"
          />

          <div className="absolute inset-0 bg-white/90"></div>

          <div className="relative max-w-6xl mx-auto">
            <span className="text-green-600 text-xs font-semibold uppercase tracking-wider">
              Insights
            </span>

            <h1 className="text-3xl md:text-5xl font-bold mt-3">
              Our <span className="text-green-600">Blog</span>
            </h1>

            <p className="mt-4 text-gray-600 max-w-2xl">
              Insights, tutorials, and practical knowledge from our development team.
            </p>
          </div>
        </section>

        {/* FEATURED BLOG */}
        {featured && (
          <section className="py-12 px-6 max-w-6xl mx-auto">

            <div className="grid md:grid-cols-2 gap-8 items-center">

              <img
                src={getBlogImage(featured, 0)}
                className="w-full h-[260px] md:h-[320px] object-cover rounded-xl"
                alt={featured.title}
              />

              <div>
                <span className="text-sm text-green-600 font-semibold">
                  Featured Article
                </span>

                <h2 className="text-2xl md:text-3xl font-bold mt-2">
                  {featured.title}
                </h2>

                <p className="text-gray-600 mt-4">
                  {stripHtml(featured.content)}
                </p>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>{featured.author || "Admin"}</span>
                  <span>{formatDate(featured.createdAt)}</span>
                </div>

                <button className="mt-5 px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                  Read Full Article
                </button>
              </div>

            </div>

          </section>
        )}

        {/* BLOG GRID */}
        <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {rest.map((b, index) => (
              <motion.div
                key={b._id}
                whileHover={{ y: -6 }}
                className="group bg-white border rounded-xl overflow-hidden 
                hover:shadow-[0_10px_30px_rgba(34,197,94,0.15)] transition"
              >

                {/* IMAGE */}
                <div className="h-44 overflow-hidden">
                  <img
                    src={getBlogImage(b, index)}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5">

                  <span className="text-xs text-green-600 font-semibold">
                    {b.author || "Admin"}
                  </span>

                  <h3 className="text-lg font-semibold mt-2 line-clamp-2 group-hover:text-green-600 transition">
                    {b.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                    {stripHtml(b.content)}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                    <span>{formatDate(b.createdAt)}</span>

                    <button className="text-green-600 font-medium hover:underline">
                      Read →
                    </button>
                  </div>

                </div>

              </motion.div>
            ))}

          </div>

        </section>

      </div>
    </Layout>
  );
}

/* helpers */
function stripHtml(html) {
  return html.replace(/<[^>]*>?/gm, "").slice(0, 120) + "...";
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}