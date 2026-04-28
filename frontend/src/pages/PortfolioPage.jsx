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
    <section className="py-24 px-6 bg-[#f7f8f5] relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[400px] h-[400px] bg-green-200/10 blur-[120px] rounded-full top-[-120px] right-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-green-100/10 blur-[100px] rounded-full bottom-[-100px] left-[-80px]" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="mb-14">
          <span className="text-green-600 text-xs font-bold uppercase tracking-wide">
            Our Work
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mt-3">
            Featured <span className="text-green-500">Projects</span>
          </h2>

          <p className="text-gray-500 mt-4 max-w-xl">
            Modern web applications, scalable systems, and high-performance digital solutions.
          </p>
        </div>

        {/* GRID */}
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

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />

                {/* ACTION BUTTONS */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">

                  {p.liveLink && (
                    <a
                      href={p.liveLink}
                      target="_blank"
                      className="px-4 py-2 bg-green-400 text-black rounded-full text-sm font-semibold hover:scale-105 transition"
                    >
                      Live
                    </a>
                  )}


                </div>

              </div>

              {/* CONTENT */}
              <div className="p-5">

                <h3 className="font-bold text-lg group-hover:text-green-600 transition">
                  {p.title}
                </h3>

                <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                  {p.description}
                </p>

                {/* TECH STACK */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {p.techStack?.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full"
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