// import { useEffect, useState } from "react";
// import { getServices, createService, deleteService } from "/src/Api/Services";
// import AdminLayout from "/src/components/AdminLayout";

// export default function AdminServices() {
//   const [data, setData] = useState([]);
//   const [form, setForm] = useState({ title: "", description: "", icon: "" });

//   const fetchData = async () => {
//     const res = await getServices();
//     setData(res.data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleCreate = async () => {
//     await createService(form);
//     setForm({ title: "", description: "", icon: "" });
//     fetchData();
//   };

//   return (
//     <AdminLayout>
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Services</h2>

//       {/* FORM */}
//       <div className="bg-white p-4 border rounded mb-4">
//         <input
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           className="border p-2 w-full mb-2"
//         />
//         <input
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           className="border p-2 w-full mb-2"
//         />
//         <input
//           placeholder="Icon"
//           value={form.icon}
//           onChange={(e) => setForm({ ...form, icon: e.target.value })}
//           className="border p-2 w-full mb-2"
//         />

//         <button
//           onClick={handleCreate}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Add Service
//         </button>
//       </div>

//       {/* LIST */}
//       {data.map((s) => (
//         <div key={s._id} className="p-3 border-b flex justify-between">
//           <span>{s.title}</span>
//           <button
//             onClick={() => deleteService(s._id).then(fetchData)}
//             className="text-red-500"
//           >
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