import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { logoutUser, getAuthHeaders } from "../../auth/authService";
import "../styles/adminmain.css";
import API_URL from "../../config/api";

function AdminLayout({ children }) {
  const navigate = useNavigate();

  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [adminMessage, setAdminMessage] = useState("");

  useEffect(() => {
    async function checkAdminAccess() {
      try {
        const response = await fetch(`${API_URL}/api/admin/check`, {
          headers: getAuthHeaders(),
        });

        const data = await response.json();

        if (!response.ok) {
          setAdminMessage(data.message || "Admin access only");
          return;
        }

        setAdminMessage("");
      } catch (error) {
        setAdminMessage(error.message);
      } finally {
        setCheckingAdmin(false);
      }
    }

    checkAdminAccess();
  }, []);

  function handleLogout() {
    logoutUser();
    navigate("/login");
  }

  return (
    <div className="admin-container">
      <AdminSidebar>
        <div className="sidebar-logout">
          <button
            type="button"
            className="admin-action-btn admin-secondary-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </AdminSidebar>

      <main className="admin-content">
        {checkingAdmin && <p>Checking admin access...</p>}

        {!checkingAdmin && adminMessage && (
          <div className="admin-message-error">
            {adminMessage}
          </div>
        )}

        {!checkingAdmin && !adminMessage && children}
      </main>
    </div>
  );
}

export default AdminLayout;