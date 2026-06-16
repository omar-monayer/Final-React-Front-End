import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";
import "../styles/adminforms.css";
import { apiFetch } from "../../config/api";

function AddSize() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    size: "",
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
    setMessage("Saving size...");

    const response = await apiFetch("/api/sizes", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add size");
    }

    setMessage("Size added successfully.");
    navigate("/admin/size");
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
            <h2>Add Size</h2>
          </div>

          {message && <p>{message}</p>}

          <form onSubmit={handleAdd}>
            <div className="admin-form-grid">
              <div className="admin-field-group">
                <label>Size Range</label>
                <input
                  name="size"
                  className="admin-input"
                  type="text"
                  placeholder="Example: 1-10"
                  value={formData.size}
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
                onClick={() => navigate("/admin/size")}
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

export default AddSize;
