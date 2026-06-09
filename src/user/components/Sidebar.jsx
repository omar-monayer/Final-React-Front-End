import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidenav">
      <h3>Menu</h3>

      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "tab active" : "tab")}
      >
        Home
      </NavLink>

      <NavLink
        to="/companies"
        className={({ isActive }) => (isActive ? "tab active" : "tab")}
      >
        Companies
      </NavLink>

      <NavLink
        to="/leads"
        className={({ isActive }) => (isActive ? "tab active" : "tab")}
      >
        Leads
      </NavLink>
    </aside>
  );
}

export default Sidebar;