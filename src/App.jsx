import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./auth/ProtectedRoute";
import UserLayout from "./layouts/UserLayout";

import Login from "./pages/Login";

import Dashboard from "./user/pages/Dashboard";
import Companies from "./user/pages/Companies";
import Leads from "./user/pages/Leads";

import CompanyFiltersDashboard from "./admin/pages/CompanyFiltersDashboard";
import CompanyUniqueFiltersDashboard from "./admin/pages/CompanyUniqueFiltersDashboard";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/leads" element={<Leads />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route
          path="/admin/company-filters"
          element={<CompanyFiltersDashboard />}
        />
        <Route
          path="/admin/company-unique-filters"
          element={<CompanyUniqueFiltersDashboard />}
        />
        <Route
          path="/admin"
          element={<Navigate to="/admin/company-filters" replace />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;