import { useContext, useEffect, useState } from "react";
import { AppContext } from "/src/context/AppContext.jsx";
import { Code, Cpu, Globe, Database, PenTool } from "lucide-react";

export default function Services() {
  const { getServices } = useContext(AppContext);
  const [services, setServices] = useState([]);


  useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getServices();
      console.log("SERVICES DATA:", data); 
      setServices(data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchData();
}, []);
  //  ICON MAP
  const iconMap = {
    code: <Code size={26} />,
    ai: <Cpu size={26} />,
    web: <Globe size={26} />,
    database: <Database size={26} />,
    design: <PenTool size={26} />,
  };

  //  preview 
  const previewServices = services.slice(0, 3);

  return (
    <section id="services" className="py-24 px-6 bg-white relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[450px] h-[450px] bg-green-200/20 rounded-full top-[-120px] right-[-120px]" />
      <div className="absolute w-[350px] h-[350px] bg-green-100/20 rounded-full bottom-[-100px] left-[-100px]" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* HEADING */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <span className="text-green-600 text-xs font-bold uppercase tracking-wide">
           Our Services
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
            Solutions &{" "}
            <span className="text-green-500">Focus Areas</span>
          </h2>

          <p className="text-gray-500 mt-4 text-sm md:text-base">
            We deliver scalable, high-performance solutions tailored for modern businesses.
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

          {previewServices.map((s) => (
            <div
              key={s._id}
              className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1"
            >

              {/* ICON */}
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-50 text-green-600 mb-4 group-hover:scale-110 transition">
                {iconMap[s.icon] || "⚙️"}
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-black">
                {s.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                {s.description}
              </p>

            </div>
          ))}

        </div>

        {/* VIEW ALL BUTTON */}
        <div className="text-center mt-12">
          <a
            href="/services"
            className="inline-block px-6 py-3 rounded-full font-mediumw-full sm:w-auto text-center
              bg-green-500 text-black font-semibold 
              shadow-md hover:shadow-xl hover:scale-105 transition"
          >
            View All Services 
          </a>
        </div>

      </div>
    </section>
  );
}