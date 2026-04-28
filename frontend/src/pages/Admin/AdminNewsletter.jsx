// import { useEffect, useState } from "react";
// import { getSubscribers } from "/src/Api/newsletter";
// import AdminLayout from "/src/components/AdminLayout";
// import { Mail } from "lucide-react";

// export default function AdminNewsletter() {
//   const [emails, setEmails] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getSubscribers();
//       setEmails(res.data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">

//         {/* HEADER */}
//         <div className="flex items-end justify-between border-b border-gray-100 pb-4">

//           <div>
//             <h1 className="text-2xl font-semibold text-gray-900">
//               Newsletter Subscribers
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">
//               All users subscribed to your updates
//             </p>
//           </div>

//           <span className="text-sm text-gray-500">
//             Total: {emails.length}
//           </span>

//         </div>

//         {/* LIST */}
//         {emails.length === 0 ? (
//           <div className="text-center py-16 text-gray-400">
//             No subscribers yet
//           </div>
//         ) : (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

//             {emails.map((e) => (
//               <div
//                 key={e._id}
//                 className="group relative bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300"
//               >

//                 {/* EMAIL */}
//                 <div className="flex items-center gap-2 text-gray-900 font-medium">
//                   <Mail size={16} className="text-green-600" />
//                   <span className="truncate">{e.email}</span>
//                 </div>

//                 {/* DATE */}
//                 <p className="text-xs text-gray-400 mt-3">
//                   Subscribed on{" "}
//                   {new Date(e.createdAt).toLocaleDateString()}
//                 </p>

//                 {/* FOOTER ID */}
//                 <div className="mt-5 pt-3 border-t border-gray-100 text-xs text-gray-400 flex justify-between">
//                   <span>Subscriber ID</span>
//                   <span>#{e._id.slice(-6)}</span>
//                 </div>

//                 {/* GREEN HOVER GLOW */}
//                 <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-r from-green-500/10 via-transparent to-transparent blur-xl"></div>

//               </div>
//             ))}

//           </div>
//         )}

//       </div>
//     </AdminLayout>
//   );
// }
import { useEffect, useState } from "react";
import API from "../../Api/axios";
import AdminLayout from "/src/components/AdminLayout";
import { Mail, Send } from "lucide-react";

export default function AdminNewsletter() {
  const [emails, setEmails] = useState([]);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  // FETCH SUBSCRIBERS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/newsletter");
        setEmails(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // SEND NEWSLETTER
  const sendEmail = async () => {
    if (!subject || !message) return;

    try {
      setSending(true);

      await API.post("/newsletter/send", {
        subject,
        message,
      });

      alert("Emails sent successfully!");

      setSubject("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Error sending emails");
    } finally {
      setSending(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">

        {/* HEADER */}
        <div className="flex items-end justify-between border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Newsletter
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage subscribers and send updates
            </p>
          </div>

          <span className="text-sm text-gray-500">
            Total: {emails.length}
          </span>
        </div>

        {/* SEND NEWSLETTER BOX */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Send size={18} className="text-green-600" />
            Send Newsletter
          </h2>

          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="border p-2 w-full mb-3 rounded-lg outline-none"
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="border p-2 w-full h-32 mb-3 rounded-lg outline-none"
          />

          <button
            onClick={sendEmail}
            disabled={sending}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            {sending ? "Sending..." : "Send to All Subscribers"}
          </button>
        </div>

        {/* SUBSCRIBERS LIST */}
        {emails.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            No subscribers yet
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {emails.map((e) => (
              <div
                key={e._id}
                className="group relative bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
              >

                {/* EMAIL */}
                <div className="flex items-center gap-2 text-gray-900 font-medium">
                  <Mail size={16} className="text-green-600" />
                  <span className="truncate">{e.email}</span>
                </div>

                {/* DATE */}
                <p className="text-xs text-gray-400 mt-3">
                  Subscribed on{" "}
                  {new Date(e.createdAt).toLocaleDateString()}
                </p>

                {/* ID */}
                <div className="mt-5 pt-3 border-t border-gray-100 text-xs text-gray-400 flex justify-between">
                  <span>Subscriber ID</span>
                  <span>#{e._id.slice(-6)}</span>
                </div>

                {/* HOVER GLOW */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-r from-green-500/10 via-transparent to-transparent blur-xl"></div>

              </div>
            ))}

          </div>
        )}

      </div>
    </AdminLayout>
  );
}