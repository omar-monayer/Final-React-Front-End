import { useEffect, useState } from "react";

import AdminLayout from "../components/AdminLayout";
import AdminPanel from "../components/AdminPanel";
import CompanyFiltersTable from "../components/CompanyFiltersTable";
import { getAuthHeaders } from "../../auth/authService";
import API_URL from "../../config/api";

function CompanyFiltersDashboard() {
  const [companyFilters, setCompanyFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

 async function loadCompanyFilters() {
  try {
    setLoading(true);
    setMessage("");

    const response = await fetch(`${API_URL}/api/company-filters`, {
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      setCompanyFilters([]);
      setMessage(data.message || "You are not allowed to access this page");
      return;
    }

    setCompanyFilters(data);
  } catch (error) {
    setMessage(error.message);
  } finally {
    setLoading(false);
  }
}
  useEffect(() => {
    loadCompanyFilters();
  }, []);

  async function handleUpdateCompanyFilter(id, updatedData) {
    const response = await fetch(
      `${API_URL}/api/company-filters/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update company filter");
    }

    setMessage("Company filter updated successfully.");
    await loadCompanyFilters();
  }
  async function handleDeleteCompanyFilter(id) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this company filter?"
  );

  if (!confirmDelete) {
    return;
  }

  const response = await fetch(
    `${API_URL}/api/company-filters/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete company filter");
  }

  setMessage("Company filter deleted successfully.");

  // this is the only refresh part needed
  await loadCompanyFilters();
}

  return (
    <AdminLayout>
      <AdminPanel title="Company Filters Data" addPath="/admin/company-filters/add">
        {message && <p>{message}</p>}

        {loading ? (
          <p>Loading company filters...</p>
        ) : (
          <CompanyFiltersTable
            rows={companyFilters}
            onUpdate={handleUpdateCompanyFilter}
            onDelete={handleDeleteCompanyFilter}
          />
        )}
        {message && (
          <div className="admin-message-error">
            {message}
          </div>
        )}
      </AdminPanel>
    </AdminLayout>
  );
}

export default CompanyFiltersDashboard;