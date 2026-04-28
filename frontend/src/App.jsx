import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

// ADMIN
import AdminPanel from "./pages/Admin/Dashboard";
import Login from "./pages/Admin/Login";
import AdminRoute from "./routes/AdminRoute";

import AdminServices from "./pages/Admin/AdminServices";
import AdminBlogs from "./pages/Admin/AdminBlogs";
import AdminPortfolio from "./pages/Admin/AdminPortfolio";
import AdminInquiry from "./pages/Admin/AdminInquiry";
import AdminNewsletter from "./pages/Admin/AdminNewsletter";
import AdminBookings from "./pages/Admin/AdminBookings";

// PUBLIC PAGES
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import BookingPage from "./pages/BookingPage";
import TrackBooking from "./pages/TrackBooking";

function App() {
  return (
    <div className="font-sans bg-[#f7f8f5] text-[#0d0f0a]">
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/track-booking" element={<TrackBooking />} />

        {/* ================= ADMIN LOGIN ================= */}
        <Route path="/admin/login" element={<Login />} />

        {/* ================= ADMIN DASHBOARD ================= */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />

        {/* ================= ADMIN SERVICES ================= */}
        <Route
          path="/admin/services"
          element={
            <AdminRoute>
              <AdminServices />
            </AdminRoute>
          }
        />

        {/* ================= ADMIN BLOGS ================= */}
        <Route
          path="/admin/blogs"
          element={
            <AdminRoute>
              <AdminBlogs />
            </AdminRoute>
          }
        />

        {/* ================= ADMIN PORTFOLIO ================= */}
        <Route
          path="/admin/portfolio"
          element={
            <AdminRoute>
              <AdminPortfolio />
            </AdminRoute>
          }
        />

        {/* ================= ADMIN INQUIRY ================= */}
        <Route
          path="/admin/inquiries"
          element={
            <AdminRoute>
              <AdminInquiry />
            </AdminRoute>
          }
        />

        {/* ================= ADMIN NEWSLETTER ================= */}
        <Route
          path="/admin/newsletter"
          element={
            <AdminRoute>
              <AdminNewsletter />
            </AdminRoute>
          }
        />

        {/* ================= ADMIN BOOKINGS ================= */}
        <Route
          path="/admin/bookings"
          element={
            <AdminRoute>
              <AdminBookings />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
