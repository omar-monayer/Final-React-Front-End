import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";
import "../styles/adminforms.css";

function AddLocation() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    location: "",
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
      setMessage("Saving location...");

      const response = await fetch("http://localhost:3000/api/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add location");
      }

      setMessage("Location added successfully.");
      navigate("/admin/location");
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
            <h2>Add Location</h2>
          </div>

          {message && <p>{message}</p>}

          <form onSubmit={handleAdd}>
            <div className="admin-form-grid">
              <div className="admin-field-group">
                <label>Location Name</label>
                <input
                  name="location"
                  className="admin-input"
                  type="text"
                  placeholder="Enter location name"
                  value={formData.location}
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
                onClick={() => navigate("/admin/location")}
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

export default AddLocation;