import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";
import "../styles/adminforms.css";
import { apiFetch } from "../../config/api";

function AddCompanyUniqueFilters() {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    locationId: "",
    industryId: "",
    sizeId: "",
    pages: "",
    extracted: "",
    leads: "",
    active: true,
    done: false,
  });

  useEffect(() => {
  async function loadFormOptions() {
  try {
    const response = await apiFetch("/api/company-unique-filters/form-options");

    if (!response.ok) {
      throw new Error("Failed to load dropdown options");
    }

    const data = await response.json();

    console.log("Form options:", data);

    setLocations(data.locations || []);
    setIndustries(data.industries || []);
    setSizes(data.sizes || []);
  } catch (error) {
    setMessage(error.message);
  }
}

  loadFormOptions();
}, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleAdd(e) {
  e.preventDefault();

  try {
    setSaving(true);
    setMessage("Saving company unique filter...");

    const response = await apiFetch("/api/company-unique-filters", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add company unique filter");
    }

    setMessage("Company unique filter added successfully.");
    navigate("/admin/company-unique-filters");
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
            <h2>Add Company Unique Filter</h2>
          </div>

          {message && <p>{message}</p>}

          <form onSubmit={handleAdd}>
            <div className="admin-form-grid">
              <div className="admin-field-group">
                <label>Location</label>
               <select
                name="locationId"
                className="admin-input"
                value={formData.locationId}
                onChange={handleChange}
                required
              >
                <option value="">Select location</option>

                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              </div>

              <div className="admin-field-group">
                <label>Industry</label>
                <select
                name="industryId"
                className="admin-input"
                value={formData.industryId}
                onChange={handleChange}
                required
              >
                <option value="">Select industry</option>

                {industries.map((industry) => (
                  <option key={industry.id} value={industry.id}>
                    {industry.name}
                  </option>
                ))}
              </select>
              </div>

              <div className="admin-field-group">
                <label>Size</label>
               <select
                name="sizeId"
                className="admin-input"
                value={formData.sizeId}
                onChange={handleChange}
                required
              >
                <option value="">Select size</option>

                {sizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.name}
                  </option>
                ))}
              </select>
              </div>

              <div className="admin-field-group">
                <label>Pages</label>
                <input
                  name="pages"
                  className="admin-input"
                  type="number"
                  value={formData.pages}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>

              <div className="admin-field-group">
                <label>Extracted Leads</label>
                <input
                  name="extracted"
                  className="admin-input"
                  type="number"
                  value={formData.extracted}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>

              <div className="admin-field-group">
                <label>Leads per Month</label>
                <input
                  name="leads"
                  className="admin-input"
                  type="number"
                  value={formData.leads}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>

              <div className="admin-field-group">
                <label>
                  <input
                    name="active"
                    type="checkbox"
                    checked={formData.active}
                    onChange={handleChange}
                  />
                  Active
                </label>
              </div>

              <div className="admin-field-group">
                <label>
                  <input
                    name="done"
                    type="checkbox"
                    checked={formData.done}
                    onChange={handleChange}
                  />
                  Done
                </label>
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
                onClick={() => navigate("/admin/company-unique-filters")}
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

export default AddCompanyUniqueFilters;