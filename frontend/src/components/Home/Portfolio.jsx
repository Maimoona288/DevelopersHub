import { useContext, useEffect, useState } from "react";
import { AppContext } from "/src/context/AppContext.jsx";

export default function Portfolio() {
  const { getProjects } = useContext(AppContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section
      id="portfolio"
      className="py-20 md:py-28 px-4 sm:px-6 bg-[#f7f8f5] relative overflow-hidden"
    >
      {/* glow */}
      <div className="absolute w-[400px] h-[400px] bg-green-200/10 blur-[100px] rounded-full top-[-120px] right-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-green-100/10 blur-[90px] rounded-full bottom-[-100px] left-[-80px]" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* heading */}
        <div className="mb-12">
          <span className="text-green-600 text-xs font-bold uppercase tracking-wide">
            Our Work
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
            Featured <span className="text-green-500">Projects</span>
          </h2>

          <p className="text-gray-500 mt-4 max-w-xl text-sm md:text-base">
            A showcase of scalable systems, modern web apps, and innovative
            solutions we’ve built for clients.
          </p>
        </div>

        {/* grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p._id}
              className="group bg-white/80 backdrop-blur border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              {/* image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                  
                  {p.liveLink && (
                    <a
                      href={p.liveLink}
                      target="_blank"
                      className="px-4 py-2 bg-green-400 text-black rounded-full text-sm font-semibold"
                    >
                      Live
                    </a>
                  )}


                </div>
              </div>

              {/* content */}
              <div className="p-5">
                <h3 className="font-bold text-lg">{p.title}</h3>

                <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                  {p.description}
                </p>

                {/* tech stack */}
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
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}