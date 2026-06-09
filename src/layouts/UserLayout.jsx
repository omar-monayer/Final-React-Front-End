import { Outlet } from "react-router-dom";
import Sidebar from "../user/components/Sidebar";

function UserLayout() {
  return (
    <>
      <Sidebar />

      <main className="page-content">
        <Outlet />
      </main>
    </>
  );
}

export default UserLayout;