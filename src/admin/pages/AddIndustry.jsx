import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";
import "../styles/adminforms.css";
import { apiFetch } from "../../config/api";

function AddIndustry() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    industry: "",
    linkedinId: "",
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
    setMessage("Saving industry...");

    const response = await apiFetch("/api/industries", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add industry");
    }

    setMessage("Industry added successfully.");
    navigate("/admin/industry");
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
            <h2>Add Industry</h2>
          </div>

          {message && <p>{message}</p>}

          <form onSubmit={handleAdd}>
            <div className="admin-form-grid">
              <div className="admin-field-group">
                <label>Industry Name</label>
                <input
                  name="industry"
                  className="admin-input"
                  type="text"
                  placeholder="Enter industry name"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-field-group">
                <label>LinkedIn ID</label>
                <input
                  name="linkedinId"
                  className="admin-input"
                  type="text"
                  placeholder="Enter LinkedIn ID"
                  value={formData.linkedinId}
                  onChange={handleChange}
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
                onClick={() => navigate("/admin/industry")}
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

export default AddIndustry;
