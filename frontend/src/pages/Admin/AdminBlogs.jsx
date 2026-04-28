import { useEffect, useState } from "react";
import {
  getBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
} from "/src/Api/Blog";
import AdminLayout from "/src/components/AdminLayout";
import { Trash2, Plus, Pencil } from "lucide-react";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    const res = await getBlogs();
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // CREATE / UPDATE
  const handleSubmit = async () => {
    if (!form.title || !form.content) return;

    setLoading(true);

    if (editingId) {
      await updateBlog(editingId, form);
    } else {
      await createBlog(form);
    }

    setForm({ title: "", content: "" });
    setEditingId(null);
    setShowForm(false);
    await fetchData();
    setLoading(false);
  };

  const handleEdit = (b) => {
    setForm({ title: b.title, content: b.content });
    setEditingId(b._id);
    setShowForm(true);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">

        {/* HEADER (SAME STYLE AS SERVICES) */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Blogs
            </h1>
            <p className="text-sm text-gray-500">
              Manage your articles professionally
            </p>
          </div>

          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setForm({ title: "", content: "" });
            }}
            className="flex items-center gap-2 bg-green-500 text-black font-semibold px-4 py-2 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition"
          >
            <Plus size={16} />
            Add Blog
          </button>
        </div>

        {/* FORM (SAME STYLE AS SERVICES) */}
        {showForm && (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-sm space-y-3 border border-gray-100">

            <input
              placeholder="Blog Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400"
            />

            <textarea
              placeholder="Blog Content"
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400"
              rows={5}
            />

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-black font-semibold px-5 py-2 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition"
              >
                {editingId ? "Update Blog" : "Create Blog"}
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* GRID (SAME STRUCTURE AS SERVICES) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {blogs.map((b) => (
            <div
              key={b._id}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-gray-200 via-transparent to-gray-200 hover:from-green-400/40 hover:to-green-300/20 transition duration-300"
            >

              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-sm transition group-hover:shadow-xl group-hover:-translate-y-1">

                {/* TOP */}
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800 line-clamp-1">
                    {b.title}
                  </h3>

                  <div className="flex gap-2 opacity-70 group-hover:opacity-100 transition">

                    <button
                      onClick={() => handleEdit(b)}
                      className="p-2 rounded-lg hover:bg-green-50 text-green-600"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() =>
                        deleteBlog(b._id).then(fetchData)
                      }
                      className="p-2 rounded-lg hover:bg-red-50 text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>
                </div>

                {/* CONTENT */}
                <p className="text-sm text-gray-500 mt-3 line-clamp-3 whitespace-pre-line">
                  {b.content}
                </p>

                {/* READ MORE */}
                <button
                  onClick={() => setSelectedBlog(b)}
                  className="text-green-600 text-xs mt-3 hover:underline"
                >
                  Read more →
                </button>

                {/* GLOW (SAME AS SERVICES) */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-r from-green-500/10 via-green-300/10 to-transparent blur-xl"></div>

              </div>
            </div>
          ))}

        </div>

        {/* MODAL */}
        {selectedBlog && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[90%] max-w-2xl p-6 rounded-2xl shadow-xl relative">

              <h2 className="text-xl font-semibold text-gray-900">
                {selectedBlog.title}
              </h2>

              <p className="text-gray-600 mt-4 whitespace-pre-line leading-relaxed">
                {selectedBlog.content}
              </p>

              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                ✕
              </button>

            </div>

          </div>
        )}

      </div>
    </AdminLayout>
  );
}