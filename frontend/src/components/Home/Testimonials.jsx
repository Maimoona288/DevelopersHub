const data = [
  {
    name: "Ali Raza",
    role: "Startup Founder",
    feedback:
      "DevelopersHub transformed our idea into a production-ready platform in weeks. The speed and code quality were exceptional.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sarah Khan",
    role: "Product Manager",
    feedback:
      "Their team understands both business and technology. We saw measurable growth within the first month after launch.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Hassan Ahmed",
    role: "CTO",
    feedback:
      "Highly scalable architecture, clean UI, and zero downtime deployment. Exactly what we needed for a fast-growing product.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-[#f7f8f5] relative overflow-hidden">

      {/* subtle glow */}
      <div className="absolute w-[400px] h-[400px] bg-green-200/10 blur-[100px] rounded-full top-[-120px] right-[-100px]" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* heading */}
        <div className="text-center mb-16">
          

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
            Trusted by <span className="text-green-500">Innovative Teams</span>
          </h2>

          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm md:text-base">
            Real results from startups and companies building scalable digital products with DevelopersHub.
          </p>
        </div>

        {/* cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {data.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition duration-300"
            >
              {/* top */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-black text-sm">
                    {t.name}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {t.role}
                  </span>
                </div>
              </div>

              {/* quote */}
              <p className="text-sm text-gray-600 leading-relaxed">
                “{t.feedback}”
              </p>

              {/* subtle accent */}
              <div className="mt-6 h-[2px] w-10 bg-green-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}