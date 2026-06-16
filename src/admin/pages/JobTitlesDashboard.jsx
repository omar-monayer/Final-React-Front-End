import { useEffect, useState } from "react";

import AdminLayout from "../components/AdminLayout";
import AdminPanel from "../components/AdminPanel";
import JobTitleTable from "../components/JobTitlesTable";
import { apiFetch } from "../../config/api";

function JobTitlesDashboard() {
  const [jobTitles, setJobTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadJobTitles() {
  try {
    setLoading(true);

    const response = await apiFetch("/api/job-titles");

    if (!response.ok) {
      throw new Error("Failed to load job titles");
    }

    const data = await response.json();
    setJobTitles(data);
  } catch (error) {
    setMessage(error.message);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    loadJobTitles();
  }, []);

  async function handleUpdateJobTitle(id, updatedData) {
  const response = await apiFetch(`/api/job-titles/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update job title");
  }

  setMessage("Job title updated successfully.");
  await loadJobTitles();
}

  async function handleDeleteJobTitle(id) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this job title?"
  );

  if (!confirmDelete) {
    return;
  }

  const response = await apiFetch(`/api/job-titles/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete job title");
  }

  setMessage("Job title deleted successfully.");
  await loadJobTitles();
}

  return (
    <AdminLayout>
      <AdminPanel title="Job Titles Data" addPath="/admin/job-titles/add">
        {message && <p>{message}</p>}

        {loading ? (
          <p>Loading job titles...</p>
        ) : (
          <JobTitleTable
            rows={jobTitles}
            onUpdate={handleUpdateJobTitle}
            onDelete={handleDeleteJobTitle}
          />
        )}
      </AdminPanel>
    </AdminLayout>
  );
}

export default JobTitlesDashboard;