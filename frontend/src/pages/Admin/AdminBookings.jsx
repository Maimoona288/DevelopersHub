import { useEffect, useState } from "react";
import { getBookings, updateBooking } from "/src/Api/Booking";
import AdminLayout from "/src/components/AdminLayout";
import { Check, X } from "lucide-react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getBookings();
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await updateBooking(id, status);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const statusStyle = (status) => {
    if (status === "approved") return "text-green-700 bg-green-50 border-green-200";
    if (status === "rejected") return "text-red-700 bg-red-50 border-red-200";
    return "text-yellow-700 bg-yellow-50 border-yellow-200";
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div className="flex items-end justify-between border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Bookings
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage client appointments
            </p>
          </div>

          <span className="text-sm text-gray-500">
            Total: {bookings.length}
          </span>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-6">

          {bookings.map((b) => (
            <div
              key={b._id}
              className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >

              {/* TOP */}
              <div className="flex justify-between items-start">

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {b.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {b.email}
                  </p>
                </div>

                {/* STATUS BADGE */}
                <span
                  className={`text-xs px-3 py-1 rounded-full border font-medium ${statusStyle(
                    b.status
                  )}`}
                >
                  {b.status}
                </span>

              </div>

              {/* DETAILS */}
              <div className="mt-4 text-sm text-gray-600 space-y-1">
                <p>📅 {b.date}</p>
                <p>⏰ {b.time}</p>

                {b.notes && (
                  <p className="mt-2 text-gray-700">
                    <span className="font-medium text-gray-900">
                      Project:
                    </span>{" "}
                    {b.notes}
                  </p>
                )}
              </div>

              {/* ACTIONS (CENTERED) */}
              <div className="mt-6 flex justify-center gap-3">

                <button
                  onClick={() => handleStatus(b._id, "approved")}
                  className="flex items-center gap-1 px-4 py-2 text-xs font-semibold bg-green-400 text-black rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition"
                >
                  
                  Approve
                </button>

                <button
                  onClick={() => handleStatus(b._id, "rejected")}
                  className="flex items-center gap-1 px-4 py-2 text-xs font-semibold bg-red-400 text-white rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition"
                >
                
                  Reject
                </button>

              </div>

              {/* GREEN GLOW */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-r from-green-500/10 via-transparent to-transparent blur-xl"></div>

            </div>
          ))}

        </div>

      </div>
    </AdminLayout>
  );
}