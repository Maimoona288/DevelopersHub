// import { useContext, useEffect, useState } from "react";
// import { AppContext } from "/src/context/AppContext.jsx";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Code, Cpu, Globe, Database, PenTool } from "lucide-react";
// import Layout from "../components/Layout";

// export default function ServicesPage() {
//   const { getServices } = useContext(AppContext);
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getServices();
//       setServices(data);
//     };
//     fetchData();
//   }, []);

//   const iconMap = {
//     code: <Code size={24} />,
//     ai: <Cpu size={24} />,
//     web: <Globe size={24} />,
//     database: <Database size={24} />,
//     design: <PenTool size={24} />,
//   };

//   // Better fallback images per category
//   const imageMap = {
//     code: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
//     ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
//     web: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
//     database: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
//     design: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
//   };

//   return (
//     <Layout>
//       <div className="bg-white">
 
//         <section className="relative h-[300px] md:h-[360px] w-full flex items-center overflow-hidden">
//           {/* BACKGROUND IMAGE */}
//           <img
//             src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
//             alt="services banner"
//             className="absolute w-full h-full object-cover"
//           />

//           {/* OVERLAY */}
//           <div className="absolute inset-0 bg-black/50"></div>

//           {/* CONTENT */}
//           <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
//             <h1 className="text-3xl md:text-5xl font-bold leading-tight">
//               Our <span className="text-green-400">Services</span>
//             </h1>

//             <p className="mt-4 max-w-2xl text-gray-200">
//               We build scalable, high-quality digital products with modern
//               technologies to help businesses grow efficiently.
//             </p>
//           </div>
//         </section>

//         {/* SERVICES GRID */}
//         <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {services.map((s) => (
//               <Link to={`/services/${s._id}`} key={s._id}>
//                 <motion.div
//                   whileHover={{ y: -6 }}
//                   className="group bg-white border rounded-xl overflow-hidden 
//                   hover:shadow-[0_8px_30px_rgba(34,197,94,0.18)] 
//                   transition duration-300"
//                 >
//                   {/* IMAGE */}
//                   <div className="h-44 overflow-hidden">
//                     <img
//                       src={s.image || imageMap[s.icon]}
//                       alt={s.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
//                     />
//                   </div>

//                   {/* CONTENT */}
//                   <div className="p-5">
//                     {/* TOP ROW */}
//                     <div className="flex items-center gap-3 mb-3">
//                       <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-50 text-green-600">
//                         {iconMap[s.icon] || "⚙️"}
//                       </div>

//                       <h3 className="text-lg font-semibold group-hover:text-green-600 transition">
//                         {s.title}
//                       </h3>
//                     </div>

//                     <p className="text-gray-500 text-sm leading-relaxed">
//                       {s.description}
//                     </p>

//                     {/* FEATURES */}
//                     <ul className="mt-3 text-sm text-gray-600 space-y-1">
//                       {s.features?.slice(0, 3).map((f, i) => (
//                         <li key={i}>• {f}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 </motion.div>
//               </Link>
//             ))}
//           </div>
//         </section>
//       </div>
//     </Layout>
//   );
// }
import { useEffect, useState } from "react";
import {
  getServices,
  createService,
  deleteService,
  updateService,
} from "/src/Api/Services";
import AdminLayout from "/src/components/AdminLayout";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function AdminServices() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", icon: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    const res = await getServices();
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!form.title || !form.description) return;

    if (editingId) {
      await updateService(editingId, form);
    } else {
      await createService(form);
    }

    setForm({ title: "", description: "", icon: "" });
    setEditingId(null);
    setShowForm(false);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      icon: item.icon || "",
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">

        {/* HEADER (MATCH YOUR FRONTEND STYLE) */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Services
            </h1>
            <p className="text-sm text-gray-500">
              Manage your services professionally
            </p>
          </div>

          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setForm({ title: "", description: "", icon: "" });
            }}
            className="flex items-center gap-2 bg-green-500 text-black font-semibold px-4 py-2 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition"
          >
            <Plus size={16} />
            Add Service
          </button>
        </div>

        {/* FORM */}
        {showForm && (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-sm space-y-3 border border-gray-100">

            <input
              placeholder="Service Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400"
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400"
              rows={4}
            />

            <input
              placeholder="Icon (optional)"
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400"
            />

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-black font-semibold px-5 py-2 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition"
              >
                {editingId ? "Update Service" : "Create Service"}
              </button>

              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* SERVICES GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {data.map((s) => (
            <div
              key={s._id}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-gray-200 via-transparent to-gray-200 hover:from-green-400/40 hover:to-green-300/20 transition duration-300"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-sm transition group-hover:shadow-xl group-hover:-translate-y-1">

                {/* TOP */}
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800">
                    {s.title}
                  </h3>

                  <div className="flex gap-2 opacity-70 group-hover:opacity-100 transition">
                    <button
                      onClick={() => handleEdit(s)}
                      className="p-2 rounded-lg hover:bg-green-50 text-green-600"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() =>
                        deleteService(s._id).then(fetchData)
                      }
                      className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                  {s.description}
                </p>

                {/* FOOTER */}
                <div className="mt-4 text-xs text-gray-400">
                  ID: {s._id.slice(-6)}
                </div>

                {/* GREEN GLOW */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-r from-green-500/10 via-green-300/10 to-transparent blur-xl"></div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </AdminLayout>
  );
}
