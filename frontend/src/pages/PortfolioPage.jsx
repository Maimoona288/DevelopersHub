import { useContext, useEffect, useState } from "react";
import { AppContext } from "/src/context/AppContext.jsx";
import { motion } from "framer-motion";
import Layout from "../components/Layout";

export default function Portfolio() {
  const { getProjects } = useContext(AppContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <Layout>
    <section className="bg-[#f7f8f5]">

  {/* HEADER WITH BACKGROUND IMAGE */}
  <div className="relative py-20 px-6 overflow-hidden">

    {/* IMAGE */}
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNfpYz1QVZyKRAMHGyidHwEcKdaphAIEBD4A&s"
      // src="/src/assets/abouttt.jpg"
      alt="portfolio background"
      className="absolute  w-full h-full object-cover"
    />

    {/* OVERLAY */}
    <div className="absolute inset-0 bg-white/20"></div>

    {/* CONTENT */}
    <div className="relative max-w-6xl mx-auto">
    
      <h1 className="text-3xl md:text-5xl font-bold mt-3 leading-tight">
        Our <span className="text-green-600">Projects</span>
      </h1>

      <p className="mt-4 text-gray-800 max-w-2xl">
        A collection of modern applications, scalable systems, and high-performance
        solutions we’ve built for real-world impact.
      </p>
    </div>

  </div>

  {/* GRID (CLEAN WHITE BACKGROUND) */}
  <div className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

      {projects.map((p) => (
        <motion.div
          key={p._id}
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="group bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition"
        >

          {/* IMAGE */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              {p.liveLink && (
                <a
                  href={p.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition"
                >
                  View Project
                </a>
              )}
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-5">
            <h3 className="font-semibold text-lg group-hover:text-green-600 transition">
              {p.title}
            </h3>

            <p className="text-gray-500 text-sm mt-2 line-clamp-3">
              {p.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {p.techStack?.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </motion.div>
      ))}

    </div>

  </div>

</section>
     </Layout>
  );
}