import { Cpu, Layers, Users, Zap } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Cpu size={28} />,
      title: "Expert Engineering",
      desc: "Highly skilled developers delivering enterprise-level solutions.",
    },
    {
      icon: <Layers size={28} />,
      title: "Scalable Architecture",
      desc: "Systems built for performance, growth, and reliability.",
    },
    {
      icon: <Users size={28} />,
      title: "Client-Focused",
      desc: "We prioritize client needs with transparent communication.",
    },
    {
      icon: <Zap size={28} />,
      title: "Fast Delivery",
      desc: "Agile workflows ensure timely and efficient delivery.",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden">

      {/* background image */}
      <div className="absolute inset-0">
        <img
        //   src="https://images.unsplash.com/photo-1551434678-e076c223a692"
          src="src/assets/ChooseUs.jpeg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 text-white">

        <div className="mb-14 text-center">
         
          <h2 className="text-3xl md:text-5xl font-bold mt-3">
            Why We’re <span className="text-green-400">Different</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-center hover:shadow-xl transition"
            >
              <div className="text-green-400 mb-4 flex justify-center">
                {f.icon}
              </div>

              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-gray-300 text-sm mt-2">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}