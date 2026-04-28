import { useEffect, useState } from "react";
import { getServices, createService, deleteService } from "/src/Api/Services";

export default function AdminServices() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", icon: "" });

  const fetchData = async () => {
    const res = await getServices();
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    await createService(form);
    setForm({ title: "", description: "", icon: "" });
    fetchData();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Services</h2>

      {/* FORM */}
      <div className="bg-white p-4 border rounded mb-4">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          placeholder="Icon"
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
          className="border p-2 w-full mb-2"
        />

        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Service
        </button>
      </div>

      {/* LIST */}
      {data.map((s) => (
        <div key={s._id} className="p-3 border-b flex justify-between">
          <span>{s.title}</span>
          <button
            onClick={() => deleteService(s._id).then(fetchData)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}