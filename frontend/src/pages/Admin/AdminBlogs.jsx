import { useEffect, useState } from "react";
import { getBlogs, createBlog, deleteBlog } from "/src/Api/Blog";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });

  const fetchData = async () => {
    const res = await getBlogs();
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    await createBlog(form);
    setForm({ title: "", content: "" });
    fetchData();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Blogs</h2>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="border p-2 w-full mb-2"
      />

      <textarea
        placeholder="Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        className="border p-2 w-full mb-2"
      />

      <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2">
        Create
      </button>

      {blogs.map((b) => (
        <div key={b._id} className="border-b p-2 flex justify-between">
          <span>{b.title}</span>
          <button onClick={() => deleteBlog(b._id).then(fetchData)} className="text-red-500">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}