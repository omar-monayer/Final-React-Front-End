import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";
import "../styles/adminforms.css";
import { apiFetch } from "../../config/api";

function AddJobTitle() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobTitle: "",
  });

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleAdd(e) {
  e.preventDefault();

  try {
    setSaving(true);
    setMessage("Saving job title...");

    const response = await apiFetch("/api/job-titles", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add job title");
    }

    setMessage("Job title added successfully.");
    navigate("/admin/job-titles");
  } catch (error) {
    setMessage(error.message);
  } finally {
    setSaving(false);
  }
}

  return (
    <AdminLayout>
      <div className="admin-form-page">
        <div className="admin-form-card">
          <div className="admin-form-header">
            <h2>Add Job Title</h2>
          </div>

          {message && <p>{message}</p>}

          <form onSubmit={handleAdd}>
            <div className="admin-form-grid">
              <div className="admin-field-group">
                <label>Job Title</label>
                <input
                  name="jobTitle"
                  className="admin-input"
                  type="text"
                  placeholder="Example: Software Engineer"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="admin-form-actions">
              <button
                className="admin-form-btn"
                type="submit"
                disabled={saving}
              >
                {saving ? "Saving..." : "Add"}
              </button>

              <button
                className="admin-form-btn admin-secondary-btn"
                type="button"
                onClick={() => navigate("/admin/job-titles")}
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddJobTitle;
