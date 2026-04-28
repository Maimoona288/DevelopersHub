import { useEffect, useState } from "react";
import { getBookings, updateBooking } from "/src/Api/Booking";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchData = async () => {
    const res = await getBookings();
    setBookings(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatus = async (id, status) => {
    await updateBooking(id, status);
    fetchData();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Bookings</h2>

      <div className="bg-white border rounded">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="p-3 border-b flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{b.name}</p>
              <p className="text-sm text-gray-500">
                {b.email} | {b.date} | {b.time}
              </p>
              <p className="text-xs text-gray-400">{b.status}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleStatus(b._id, "approved")}
                className="px-2 py-1 text-xs bg-green-500 text-white rounded"
              >
                Approve
              </button>

              <button
                onClick={() => handleStatus(b._id, "rejected")}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}