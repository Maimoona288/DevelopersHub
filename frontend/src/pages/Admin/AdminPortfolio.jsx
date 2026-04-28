import { useEffect, useState } from "react";
import { getProjects, createProject, deleteProject } from "/src/Api/Portfolio";

export default function AdminPortfolio() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    liveLink: "",
  });

  const fetchData = async () => {
    const res = await getProjects();
    setItems(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    await createProject(form);
    fetchData();
  };

  return (
    <div className="p-6">
      <h2 className="font-bold text-xl mb-4">Portfolio</h2>

      <input placeholder="Title" className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, title: e.target.value })} />

      <input placeholder="Image URL" className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, image: e.target.value })} />

      <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2">
        Add
      </button>

      {items.map((p) => (
        <div key={p._id} className="border-b p-2 flex justify-between">
          {p.title}
          <button onClick={() => deleteProject(p._id).then(fetchData)} className="text-red-500">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}