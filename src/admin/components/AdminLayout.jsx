import AdminSidebar from "./AdminSidebar";
import "../styles/adminmain.css";

function AdminLayout({ children }) {
  return (
    <div className="admin-container">
      <AdminSidebar />

      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;