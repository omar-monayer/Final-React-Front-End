import { NavLink } from "react-router-dom";

function Sidebar({ children }) {
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

      <div className="sidebar-logout">
        {children}
      </div>
    </aside>
  );
}

export default Sidebar;