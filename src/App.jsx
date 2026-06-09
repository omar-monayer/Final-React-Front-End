import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./auth/ProtectedRoute";
import UserLayout from "./layouts/UserLayout";

import Login from "./pages/Login";

import Dashboard from "./user/pages/Dashboard";
import Companies from "./user/pages/Companies";
import Leads from "./user/pages/Leads";

import CompanyFiltersDashboard from "./admin/pages/CompanyFiltersDashboard";
import CompanyUniqueFiltersDashboard from "./admin/pages/CompanyUniqueFiltersDashboard";
import LocationDashboard from "./admin/pages/LocationDashboard";
import IndustryDashboard from "./admin/pages/IndustryDashboard";
import SizeDashboard from "./admin/pages/SizeDashboard";
import JobTitlesDashboard from "./admin/pages/JobTitlesDashboard";

import AddCompanyFilters from "./admin/pages/AddCompanyFilters";
import AddCompanyUniqueFilter from "./admin/pages/AddCompanyUniqueFilter";
import AddLocation from "./admin/pages/AddLocation";
import AddIndustry from "./admin/pages/AddIndustry";
import AddSize from "./admin/pages/AddSize";
import AddJobTitle from "./admin/pages/AddJobTitle";

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
            path="/admin/location"
            element={<LocationDashboard />}
          />
          <Route
            path="/admin/industry"
            element={<IndustryDashboard />}
          />
          <Route
            path="/admin/size"
            element={<SizeDashboard />}
          />
        <Route
            path="/admin/job-titles"
            element={<JobTitlesDashboard />}
          />
          <Route
            path="/admin/company-filters/add"
            element={<AddCompanyFilters />}
          />
        <Route
            path="/admin/company-unique-filters/add"
            element={<AddCompanyUniqueFilter />}
          />
        <Route
            path="/admin/location/add"
            element={<AddLocation />}
          />
          <Route
            path="/admin/industry/add"
            element={<AddIndustry />}
          />
          <Route
            path="/admin/size/add"
            element={<AddSize />}
          />
          <Route
            path="/admin/job-titles/add"
            element={<AddJobTitle />}
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