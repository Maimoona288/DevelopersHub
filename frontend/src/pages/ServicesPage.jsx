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
    code: <Code size={24} />,
    ai: <Cpu size={24} />,
    web: <Globe size={24} />,
    database: <Database size={24} />,
    design: <PenTool size={24} />,
  };

  // Better fallback images per category
  const imageMap = {
    code: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
    ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    web: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    database: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
    design: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
  };

  return (
    <Layout>
      <div className="bg-white">
 
        <section className="relative h-[300px] md:h-[360px] w-full flex items-center overflow-hidden">
          {/* BACKGROUND IMAGE */}
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            alt="services banner"
            className="absolute w-full h-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* CONTENT */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Our <span className="text-green-400">Services</span>
            </h1>

            <p className="mt-4 max-w-2xl text-gray-200">
              We build scalable, high-quality digital products with modern
              technologies to help businesses grow efficiently.
            </p>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link to={`/services/${s._id}`} key={s._id}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group bg-white border rounded-xl overflow-hidden 
                  hover:shadow-[0_8px_30px_rgba(34,197,94,0.18)] 
                  transition duration-300"
                >
                  {/* IMAGE */}
                  <div className="h-44 overflow-hidden">
                    <img
                      src={s.image || imageMap[s.icon]}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    {/* TOP ROW */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-50 text-green-600">
                        {iconMap[s.icon] || "⚙️"}
                      </div>

                      <h3 className="text-lg font-semibold group-hover:text-green-600 transition">
                        {s.title}
                      </h3>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed">
                      {s.description}
                    </p>

                    {/* FEATURES */}
                    <ul className="mt-3 text-sm text-gray-600 space-y-1">
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
