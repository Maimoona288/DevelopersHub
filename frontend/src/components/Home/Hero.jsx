import { useEffect, useState } from "react";

export default function Hero() {
  const images = [
    "https://kit.baliniz.com/mindtech/wp-content/uploads/sites/8/2021/04/selective-focus-of-information-security-analysts-using-charts-on-computer-monitors-while-working-in-e1618327034475.jpg",
    "https://flex.creativemox.com/newtech/wp-content/uploads/sites/6/2026/02/img_4-2048x1024.jpg",
    "https://kit.baliniz.com/mindtech/wp-content/uploads/sites/8/2021/04/web-developer-busy-working-e1618327055136.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center px-4 sm:px-6 overflow-hidden text-white">

      {/* IMAGE SLIDER (RESPONSIVE FIX) */}
      <div className="absolute inset-0 z-0">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="hero background"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* glow */}
      <div className="absolute w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-green-400/10 blur-[120px] rounded-full top-[-120px] right-[-100px] z-10" />

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto relative z-20">

        {/* BADGE */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 border border-green-300 bg-white/10 backdrop-blur rounded-full text-green-300 text-[10px] sm:text-xs font-semibold">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Now Accepting New Projects — 2026
        </div>

        {/* HEADING */}
        <h1 className="text-[2rem] sm:text-[3rem] md:text-[5rem] lg:text-[6rem] font-extrabold leading-[1.1] mt-5">
          Build bold <br />
          <span className="text-green-400">
            digital experiences
          </span>
        </h1>

        {/* SUBTEXT */}
        <p className="max-w-xl text-gray-200 mt-4 leading-relaxed text-sm sm:text-base">
          DevelopersHub engineers scalable systems, AI products, and high-performance applications designed for modern businesses.
        </p>

       
        {/* CTA LINKS */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 md:mt-10">
          {/* PRIMARY */}
           <a
             href="#booking"
             className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300"
          >
             Book Consultation
           </a>

           {/* SECONDARY */}
           <a
             href="#portfolio"
             className="w-full sm:w-auto text-center px-6 py-3 rounded-full border border-gray-300 text-white hover:border-green-400 hover:text-green-500 hover:bg-green-50 transition duration-300"
           >
             View Work
           </a>

          {/* TERTIARY */}
           <a
             href="#services"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-full text-white hover:text-black hover:bg-gray-300 transition duration-300"
          >
             Explore Services
           </a>

         </div>
      </div>
    </section>
  );
}