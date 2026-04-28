import AdminSidebar from "/src/components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">{children}</div>
    </div>
  );
}