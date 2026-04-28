// // import { Link, useLocation } from "react-router-dom";
// // import { useState } from "react";
// // import { LogOut, ChevronLeft, ChevronRight } from "lucide-react";
// // const nav = [
// //   { path: "/admin/dashboard",  label: "Dashboard",  icon: "⬡", section: "Overview" },
// //   { path: "/admin/services",   label: "Services",   icon: "⚙", section: "Content"  },
// //   { path: "/admin/portfolio",  label: "Portfolio",  icon: "◫", section: "Content"  },
// //   { path: "/admin/blogs",      label: "Blog Posts", icon: "✎", section: "Content"  },
// //   { path: "/admin/inquiries",  label: "Inquiries",  icon: "◎", section: "Clients"  },
// //   { path: "/admin/bookings",   label: "Bookings",   icon: "◷", section: "Clients"  },
// //   { path: "/admin/newsletter", label: "Newsletter", icon: "✉", section: "Clients"  },
// //   { path: "/admin/settings",   label: "Settings",   icon: "◈", section: "Account"  },

// // ];

// // export default function AdminSidebar() {
// //   const location = useLocation();

// //   return (
// //     <div className="w-64 h-screen bg-white border-r p-4">
// //       <h1 className="font-bold text-xl mb-6">Admin Panel</h1>

// //       {nav.map((item) => (
// //         <Link
// //           key={item.path}
// //           to={item.path}
// //           className={`block p-2 rounded mb-1 ${
// //             location.pathname === item.path
// //               ? "bg-green-100 text-green-600"
// //               : "hover:bg-gray-100"
// //           }`}
// //         >
// //           {item.label}
// //         </Link>
// //       ))}
// //     </div>
// //   );
// // }

// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { LogOut, ChevronLeft, ChevronRight } from "lucide-react";
// // import logooo from "/src/assets/logooo.png";
// // import logoo from "../assets/logoo.png";
// import logooo from "../assets/logooo.png";
// const nav = [

//   { path: "/admin/dashboard",  label: "Dashboard",  icon: "⬡", section: "Overview" },
//   { path: "/admin/services",   label: "Services",   icon: "⚙", section: "Content"  },
//   { path: "/admin/portfolio",  label: "Portfolio",  icon: "◫", section: "Content"  },
//   { path: "/admin/blogs",      label: "Blog Posts", icon: "✎", section: "Content"  },
//   { path: "/admin/inquiries",  label: "Inquiries",  icon: "◎", section: "Clients"  },
//   { path: "/admin/bookings",   label: "Bookings",   icon: "◷", section: "Clients"  },
//   { path: "/admin/newsletter", label: "Newsletter", icon: "✉", section: "Clients"  },

// ];

// const sections = ["Overview", "Content", "Clients"];

// export default function AdminSidebar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleLogout = () => {
//     // replace with your actual logout logic
//     navigate("/admin/login");
//   };

//   const navContent = (
//     <div className="flex flex-col h-full">

//       {/* LOGO */}
//       <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100">
//        <div className="w-9 h-9 min-w-[36px] rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
//   <img
//     // src="/src/assets/logooo.png"
//     src={logooo}
//     alt="Logo"
//     className="w-full h-full object-cover"
//   />
// </div>
//         {!collapsed && (
//           <div className="overflow-hidden">
//             <p className="font-extrabold text-sm tracking-wide leading-tight text-gray-900">
//               Developers<span className="text-green-500">Hub</span>
//             </p>
//             <p className="text-[9px] text-gray-400 tracking-[2.5px] uppercase">Corporation</p>
//           </div>
//         )}
//       </div>

//       {/* NAV */}
//       <nav className="flex-1 px-2.5 py-3 overflow-y-auto">
//         {sections.map((section) => {
//           const items = nav.filter((n) => n.section === section);
//           return (
//             <div key={section} className="mb-1">
//               {!collapsed ? (
//                 <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[1.5px] px-2 pt-3 pb-1.5">
//                   {section}
//                 </p>
//               ) : (
//                 <div className="h-3" />
//               )}

//               {items.map((item) => {
//                 const isActive = location.pathname === item.path;
//                 return (
//                   <Link
//                     key={item.path}
//                     to={item.path}
//                     title={collapsed ? item.label : undefined}
//                     onClick={() => setMobileOpen(false)}
//                     className={`
//                       flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-sm font-medium mb-0.5
//                       transition-all duration-150 group select-none
//                       ${isActive
//                         ? "bg-green-50 text-green-600"
//                         : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 active:scale-[0.98] active:bg-gray-100"
//                       }
//                     `}
//                   >
//                     <span
//                       className={`text-base w-5 text-center flex-shrink-0 transition-transform duration-150
//                         ${isActive ? "scale-110" : "group-hover:scale-110"}`}
//                     >
//                       {item.icon}
//                     </span>
//                     {!collapsed && (
//                       <>
//                         <span className="truncate">{item.label}</span>
//                         {isActive && (
//                           <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
//                         )}
//                       </>
//                     )}
//                   </Link>
//                 );
//               })}
//             </div>
//           );
//         })}
//       </nav>

//       {/* LOGOUT */}
//       <div className="px-2.5 py-3 border-t border-gray-100">
//         <button
//           onClick={handleLogout}
//           title={collapsed ? "Logout" : undefined}
//           className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-sm font-medium
//             text-red-500 hover:bg-red-50 hover:text-red-600
//             active:scale-[0.98] active:bg-red-100
//             transition-all duration-150 group select-none cursor-pointer"
//         >
//           <LogOut
//             size={17}
//             className="min-w-[17px] flex-shrink-0 transition-transform duration-150 group-hover:scale-110"
//           />
//           {!collapsed && <span>Logout</span>}
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {/* MOBILE HAMBURGER */}
//       <button
//         onClick={() => setMobileOpen(true)}
//         className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-sm"
//       >
//         <div className="space-y-1">
//           <span className="block w-5 h-0.5 bg-gray-700" />
//           <span className="block w-5 h-0.5 bg-gray-700" />
//           <span className="block w-5 h-0.5 bg-gray-700" />
//         </div>
//       </button>

//       {/* MOBILE BACKDROP */}
//       {mobileOpen && (
//         <div
//           className="md:hidden fixed inset-0 bg-black/40 z-40"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       {/* MOBILE DRAWER */}
//       <div
//         className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl border-r border-gray-100
//           transform transition-transform duration-300
//           ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         {navContent}
//       </div>

//       {/* DESKTOP SIDEBAR */}
//       <div
//         className={`hidden md:flex flex-col h-screen bg-white border-r border-gray-100 sticky top-0 relative
//           transition-all duration-300 ease-in-out
//           ${collapsed ? "w-[60px]" : "w-64"}`}
//       >
//         {navContent}

//         {/* COLLAPSE BUTTON */}
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="absolute -right-3 top-[72px] w-6 h-6 bg-white border border-gray-200 rounded-full
//             flex items-center justify-center shadow-sm z-10
//             hover:bg-green-50 hover:border-green-300 hover:text-green-600
//             active:scale-90 transition-all duration-150 text-gray-400"
//         >
//           {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
//         </button>
//       </div>
//     </>
//   );
// }
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import logooo from "../assets/logooo.png";

const nav = [
  { path: "/admin/dashboard", label: "Dashboard", icon: "⬡" },
  { path: "/admin/services", label: "Services", icon: "⚙" },
  { path: "/admin/portfolio", label: "Portfolio", icon: "◫" },
  { path: "/admin/blogs", label: "Blog Posts", icon: "✎" },
  { path: "/admin/inquiries", label: "Inquiries", icon: "◎" },
  { path: "/admin/bookings", label: "Bookings", icon: "◷" },
  { path: "/admin/newsletter", label: "Newsletter", icon: "✉" },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); // optional
    navigate("/admin/login");
  };

  const navContent = (
    <div className="flex flex-col h-full">

      {/* LOGO */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100">
        <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
          <img src={logooo} alt="Logo" className="w-full h-full object-cover" />
        </div>

        {!collapsed && (
          <div>
            <p className="font-bold text-sm">
              Developers<span className="text-green-500">Hub</span>
            </p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Admin Panel
            </p>
          </div>
        )}
      </div>

      {/* NAV */}
      <nav className="flex-1 px-2 py-3 space-y-1">
        {nav.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? item.label : ""}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
                ${
                  isActive
                    ? "bg-green-50 text-green-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              <span className="w-5 text-center">{item.icon}</span>

              {!collapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="p-2 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
        >
          <LogOut size={16} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white border rounded"
      >
        ☰
      </button>

      {/* MOBILE BACKDROP */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-md md:hidden transition-transform
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {navContent}
      </div>

      {/* DESKTOP SIDEBAR */}
      <div
        className={`hidden md:flex flex-col h-screen bg-white border-r relative transition-all
        ${collapsed ? "w-[60px]" : "w-64"}`}
      >
        {navContent}

        {/* COLLAPSE BUTTON */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border rounded-full flex items-center justify-center"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </div>
    </>
  );
}