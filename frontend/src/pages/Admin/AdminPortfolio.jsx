// import { useEffect, useState } from "react";
// import { getProjects, createProject, deleteProject } from "/src/Api/Portfolio";
// import AdminLayout from "/src/components/AdminLayout";

// export default function AdminPortfolio() {
//   const [items, setItems] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     image: "",
//     liveLink: "",
//   });

//   const fetchData = async () => {
//     const res = await getProjects();
//     setItems(res.data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleCreate = async () => {
//     await createProject(form);
//     fetchData();
//   };

//   return (
//     <AdminLayout>
//     <div className="p-6">
//       <h2 className="font-bold text-xl mb-4">Portfolio</h2>

//       <input placeholder="Title" className="border p-2 w-full mb-2"
//         onChange={(e) => setForm({ ...form, title: e.target.value })} />

//       <input placeholder="Image URL" className="border p-2 w-full mb-2"
//         onChange={(e) => setForm({ ...form, image: e.target.value })} />

//       <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2">
//         Add
//       </button>

//       {items.map((p) => (
//         <div key={p._id} className="border-b p-2 flex justify-between">
//           {p.title}
//           <button onClick={() => deleteProject(p._id).then(fetchData)} className="text-red-500">
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//     </AdminLayout>
//   );
// }
import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  deleteProject,
} from "/src/Api/Portfolio";
import AdminLayout from "/src/components/AdminLayout";
import { Trash2, Plus } from "lucide-react";

export default function AdminPortfolio() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    liveLink: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const res = await getProjects();
    setItems(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    if (!form.title || !form.image) return;

    setLoading(true);
    await createProject(form);
    setForm({ title: "", description: "", image: "", liveLink: "" });
    await fetchData();
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Portfolio
            </h1>
            <p className="text-sm text-gray-500">
              Manage your projects showcase
            </p>
          </div>
        </div>

        {/* FORM (CMS STYLE) */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-sm space-y-3 border border-gray-100">

          <input
            placeholder="Project Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400"
          />

          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400"
          />

          <input
            placeholder="Live Link (optional)"
            value={form.liveLink}
            onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            rows={3}
            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400"
          />

          <button
            onClick={handleCreate}
            disabled={loading}
            className="flex items-center gap-2 bg-green-500 text-black font-semibold px-5 py-2 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition disabled:opacity-50"
          >
            <Plus size={16} />
            {loading ? "Adding..." : "Add Project"}
          </button>
        </div>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {items.map((p) => (
            <div
              key={p._id}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1"
            >

              {/* IMAGE */}
              <div className="h-44 w-full overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5">

                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800">
                    {p.title}
                  </h3>

                  <button
                    onClick={() =>
                      deleteProject(p._id).then(fetchData)
                    }
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500 opacity-70 group-hover:opacity-100 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                  {p.description}
                </p>

                {/* LINK */}
                {p.liveLink && (
                  <a
                    href={p.liveLink}
                    target="_blank"
                    className="text-green-600 text-sm mt-3 inline-block hover:underline"
                  >
                    View Live →
                  </a>
                )}

                {/* GREEN GLOW */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-r from-green-500/10 via-transparent to-transparent blur-xl"></div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </AdminLayout>
  );
}