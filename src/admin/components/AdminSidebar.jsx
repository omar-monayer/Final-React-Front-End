import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="admin-sidenav">
      <h3>Pages</h3>

      <NavLink
        to="/admin/company-filters"
        className={({ isActive }) =>
          isActive ? "admin-tab active" : "admin-tab"
        }
      >
        Company Filters
      </NavLink>

      <NavLink
        to="/admin/company-unique-filters"
        className={({ isActive }) =>
          isActive ? "admin-tab active" : "admin-tab"
        }
      >
        Company Unique Filters
      </NavLink>

      <NavLink
        to="/admin/location"
        className={({ isActive }) =>
          isActive ? "admin-tab active" : "admin-tab"
        }
      >
        Location
      </NavLink>

      <NavLink
        to="/admin/industry"
        className={({ isActive }) =>
          isActive ? "admin-tab active" : "admin-tab"
        }
      >
        Industry
      </NavLink>

      <NavLink
        to="/admin/size"
        className={({ isActive }) =>
          isActive ? "admin-tab active" : "admin-tab"
        }
      >
        Size
      </NavLink>

      <NavLink
        to="/admin/job-titles"
        className={({ isActive }) =>
          isActive ? "admin-tab active" : "admin-tab"
        }
      >
        Job Titles
      </NavLink>
    </aside>
  );
}

export default AdminSidebar;