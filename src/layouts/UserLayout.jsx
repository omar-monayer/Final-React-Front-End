import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../user/components/Sidebar";
import { logoutUser } from "../auth/authService";

function UserLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/login");
  }

  return (
    <>
      <Sidebar>
        <button
          type="button"
          className="admin-action-btn admin-secondary-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </Sidebar>

      <main className="page-content">
        <Outlet />
      </main>
    </>
  );
}

export default UserLayout;