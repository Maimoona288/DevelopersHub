import { useContext, useEffect, useState } from "react";
import { AppContext } from "/src/context/AppContext.jsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Code, Cpu, Globe, Database, PenTool } from "lucide-react";
import Layout from "../components/Layout";

export default function ServicesPage() {
  const { getServices } = useContext(AppContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getServices();
      setServices(data);
    };
    fetchData();
  }, []);

  const iconMap = {
    code: <Code size={28} />,
    ai: <Cpu size={28} />,
    web: <Globe size={28} />,
    database: <Database size={28} />,
    design: <PenTool size={28} />,
  };

  return (
    
      <Layout>
    <div className="bg-white">

      {/* HERO */}
      <section className="relative py-28 px-6 text-center bg-gradient-to-r from-green-50 to-white overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold">
            Our <span className="text-green-500">Services</span>
          </h1>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            We provide cutting-edge solutions to help businesses grow, scale, and succeed in the digital era.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((s) => (
            <Link to={`/services/${s._id}`} key={s._id}>

              {/* FRAMER MOTION CARD */}
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-xl"
              >

                {/* IMAGE */}
                <div className="h-52 overflow-hidden relative">

                  <img
                    src={s.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c"}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  {/* GRADIENT */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* BADGE */}
                  <span className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow">
                    Service
                  </span>

                </div>

                {/* CONTENT */}
                <div className="p-6">

                  {/* ICON */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-50 text-green-600 mb-4 group-hover:scale-110 transition">
                    {iconMap[s.icon] || "⚙️"}
                  </div>

                  <h3 className="text-xl font-semibold group-hover:text-green-600 transition">
                    {s.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    {s.description}
                  </p>

                  {/* FEATURES */}
                  <ul className="mt-4 text-sm text-gray-600 space-y-1">
                    {s.features?.slice(0, 3).map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>

                </div>
              </motion.div>

            </Link>
          ))}

        </div>
      </section>

    </div>
    </Layout>
  );
}