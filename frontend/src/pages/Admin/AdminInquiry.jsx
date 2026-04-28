// import { useEffect, useState } from "react";
// import { getInquiries } from "/src/Api/inquiry";
// import AdminLayout from "/src/components/AdminLayout";

// export default function AdminInquiry() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     getInquiries().then((res) => setData(res.data));
//   }, []);

//   return (
//     <AdminLayout>
//     <div className="p-6">
//       <h2 className="font-bold text-xl mb-4">Inquiries</h2>

//       {data.map((i) => (
//         <div key={i._id} className="border-b p-2">
//           <p>{i.name} - {i.email}</p>
//           <p className="text-gray-500 text-sm">{i.message}</p>
//         </div>
//       ))}
//     </div>
//     </AdminLayout>
//   );
// }

import { useEffect, useState } from "react";
import { getInquiries } from "/src/Api/inquiry";
import AdminLayout from "/src/components/AdminLayout";
import { Mail, User } from "lucide-react";

export default function AdminInquiry() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getInquiries();
      setData(res.data);
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div className="flex items-end justify-between border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Inquiries
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Messages received from users and clients
            </p>
          </div>

          <span className="text-sm text-gray-500">
            Total: {data.length}
          </span>
        </div>

        {/* GRID */}
        {data.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            No inquiries found
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {data.map((i) => (
              <div
                key={i._id}
                className="group relative bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300"
              >

                {/* TOP INFO */}
                <div className="flex items-start justify-between">

                  <div className="space-y-1">

                    <div className="flex items-center gap-2 text-gray-900 font-semibold">
                      <User size={16} className="text-green-600" />
                      {i.name}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Mail size={14} />
                      {i.email}
                    </div>

                  </div>

                </div>

                {/* MESSAGE */}
                <p className="text-sm text-gray-600 mt-4 leading-relaxed whitespace-pre-line line-clamp-4">
                  {i.message}
                </p>
              <div className="mt-5 pt-3 border-t border-gray-100 text-xs text-gray-400 flex justify-between"> </div>

                {/* GREEN HOVER GLOW */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-r from-green-500/10 via-transparent to-transparent blur-xl"></div>

              </div>
            ))}

          </div>
        )}

      </div>
    </AdminLayout>
  );
}