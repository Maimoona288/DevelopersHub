import { useEffect, useState } from "react";
import { getInquiries } from "/src/Api/inquiry";

export default function AdminInquiry() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getInquiries().then((res) => setData(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="font-bold text-xl mb-4">Inquiries</h2>

      {data.map((i) => (
        <div key={i._id} className="border-b p-2">
          <p>{i.name} - {i.email}</p>
          <p className="text-gray-500 text-sm">{i.message}</p>
        </div>
      ))}
    </div>
  );
}