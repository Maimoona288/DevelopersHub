export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 px-4 sm:px-6 bg-[#f7f8f5] relative overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[400px] h-[400px] bg-green-200/10 blur-[100px] rounded-full top-[-120px] right-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-green-100/10 blur-[90px] rounded-full bottom-[-100px] left-[-80px]" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">

        {/* LEFT VISUAL */}
        <div>

          <div className="relative bg-white/80 backdrop-blur border border-gray-100 rounded-2xl aspect-[4/3] flex items-center justify-center text-5xl md:text-6xl shadow-md">
           <img
  src="/src/assets/abouttt.jpg"
  alt="Developers team working"
  className="w-full h-full object-cover rounded-2xl"
/>

            <div className="absolute bottom-[-15px] right-[-10px] bg-gradient-to-r from-green-400 to-green-600 text-black px-5 py-3 rounded-xl shadow-lg text-center">
              <div className="text-2xl md:text-3xl font-extrabold">5+</div>
              <div className="text-[10px] md:text-xs font-semibold">Years Experience</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6 md:mt-8">
            {[
              ["78+", "Team"],
              ["150+", "Projects"],
              ["30+", "Interns"],
            ].map((k, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 md:p-4 text-center shadow-sm">
                <div className="text-xl md:text-2xl font-bold text-black">{k[0]}</div>
                <div className="text-[11px] md:text-xs text-gray-500">{k[1]}</div>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div>

          <span className="text-green-600 text-[11px] md:text-xs font-bold uppercase tracking-wide">
            About DHC
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 leading-tight">
            Your Trusted <span className="text-green-500">Tech Partner</span>
          </h2>

          <p className="text-gray-500 mt-4 leading-relaxed text-sm md:text-base max-w-xl">
            DevelopersHub Corporation is a full-stack software agency delivering scalable
            digital products, enterprise systems, and AI-powered solutions.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-gray-600">
            <li className="flex gap-2"><span className="text-green-500">✔</span> High-quality enterprise software delivery</li>
            <li className="flex gap-2"><span className="text-green-500">✔</span> Expert engineering team</li>
            <li className="flex gap-2"><span className="text-green-500">✔</span> Client-focused development process</li>
            <li className="flex gap-2"><span className="text-green-500">✔</span> Scalable architecture systems</li>
            <li className="flex gap-2"><span className="text-green-500">✔</span> Internship & training programs</li>
          </ul>

          {/* LINKS */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">

            <a
              href="#contact"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-full 
              bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold 
              shadow-md hover:shadow-xl hover:scale-105 transition"
            >
              Work With Us
            </a>

            <a
              href="#services"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-full 
              border border-gray-300 text-gray-700 
              hover:border-green-400 hover:text-green-500 hover:bg-green-50 
              transition"
            >
              Explore Services
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}