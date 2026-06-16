import { useEffect, useState } from "react";

import AdminLayout from "../components/AdminLayout";
import AdminPanel from "../components/AdminPanel";
import IndustryTable from "../components/IndustryTable";
import { apiFetch } from "../../config/api";

function IndustryDashboard() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadIndustries() {
  try {
    setLoading(true);

    const response = await apiFetch("/api/industries");

    if (!response.ok) {
      throw new Error("Failed to load industries");
    }

    const data = await response.json();
    setIndustries(data);
  } catch (error) {
    setMessage(error.message);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    loadIndustries();
  }, []);

  async function handleUpdateIndustry(id, updatedData) {
  const response = await apiFetch(`/api/industries/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update industry");
  }

  setMessage("Industry updated successfully.");
  await loadIndustries();
}

  async function handleDeleteIndustry(id) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this industry?"
  );

  if (!confirmDelete) {
    return;
  }

  const response = await apiFetch(`/api/industries/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete industry");
  }

  setMessage("Industry deleted successfully.");
  await loadIndustries();
}

  return (
    <AdminLayout>
      <AdminPanel title="Industry Data" addPath="/admin/industry/add">
        {message && <p>{message}</p>}

        {loading ? (
          <p>Loading industries...</p>
        ) : (
          <IndustryTable
            rows={industries}
            onUpdate={handleUpdateIndustry}
            onDelete={handleDeleteIndustry}
          />
        )}
      </AdminPanel>
    </AdminLayout>
  );
}

export default IndustryDashboard;