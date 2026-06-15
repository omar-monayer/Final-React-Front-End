import { useEffect, useState } from "react";

import AdminLayout from "../components/AdminLayout";
import AdminPanel from "../components/AdminPanel";
import CompanyUniqueFiltersTable from "../components/CompanyUniqueFiltersTable";
import API_URL from "../../config/api";

function CompanyUniqueFiltersDashboard() {
  const [companyUniqueFilters, setCompanyUniqueFilters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadCompanyUniqueFilters() {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/company-unique-filters` 
      );

      if (!response.ok) {
        throw new Error("Failed to load company unique filters");
      }

      const data = await response.json();
      setCompanyUniqueFilters(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadFormOptions() {
    const response = await fetch(
      `${API_URL}/api/company-unique-filters/form-options`
    );

    if (!response.ok) {
      throw new Error("Failed to load form options");
    }

    const data = await response.json();

    setLocations(data.locations || []);
    setIndustries(data.industries || []);
    setSizes(data.sizes || []);
  }

  useEffect(() => {
    async function loadPage() {
      try {
        await Promise.all([loadCompanyUniqueFilters(), loadFormOptions()]);
      } catch (error) {
        setMessage(error.message);
        setLoading(false);
      }
    }

    loadPage();
  }, []);

  async function handleUpdateCompanyUniqueFilter(id, updatedData) {
    const response = await fetch(
      `${API_URL}/api/company-unique-filters/${id}`,
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
      throw new Error(data.message || "Failed to update company unique filter");
    }

    setMessage("Company unique filter updated successfully.");
    await loadCompanyUniqueFilters();
  }
  async function handleDeleteCompanyUniqueFilter(id) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this company unique filter?"
  );

  if (!confirmDelete) {
    return;
  }

  const response = await fetch(
    `${API_URL}/api/company-unique-filters/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete company unique filter");
  }

  setMessage("Company unique filter deleted successfully.");

  await loadCompanyUniqueFilters();
}

  return (
    <AdminLayout>
      <AdminPanel
        title="Company Unique Filters Data"
        addPath="/admin/company-unique-filters/add"
      >
        {message && <p>{message}</p>}

        {loading ? (
          <p>Loading company unique filters...</p>
        ) : (
          <CompanyUniqueFiltersTable
          rows={companyUniqueFilters}
          locations={locations}
          industries={industries}
          sizes={sizes}
          onUpdate={handleUpdateCompanyUniqueFilter}
          onDelete={handleDeleteCompanyUniqueFilter}
        />
        )}
      </AdminPanel>
    </AdminLayout>
  );
}

export default CompanyUniqueFiltersDashboard;