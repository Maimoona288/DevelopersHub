import { useEffect, useState } from "react";
import { getSubscribers } from "/src/Api/newsletter";

export default function AdminNewsletter() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    getSubscribers().then((res) => setEmails(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Newsletter</h2>

      <div className="bg-white border rounded">
        {emails.map((e) => (
          <div key={e._id} className="p-3 border-b flex justify-between">
            <span>{e.email}</span>
            <span className="text-gray-400 text-sm">
              {new Date(e.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}