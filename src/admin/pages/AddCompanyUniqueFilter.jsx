import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "../styles/adminforms.css";

const locationOptions = ["Amman", "Dubai", "Riyadh"];
const industryOptions = ["Technology", "Healthcare", "Construction"];
const sizeOptions = ["1-10", "11-50", "51-200"];

function AddCompanyUniqueFilter() {
  const [formData, setFormData] = useState({
    location: "",
    industry: "",
    size: "",
  });

  const [activePopup, setActivePopup] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");

  function openPopup(popupName) {
    setActivePopup(popupName);
    setSearchText("");
  }

  function closePopup() {
    setActivePopup(null);
    setSearchText("");
  }

  function selectValue(fieldName, value) {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }

  function handleSizeChange(event) {
    setFormData((prev) => ({
      ...prev,
      size: event.target.value,
    }));
  }

  function handleAdd() {
    if (!formData.location || !formData.industry || !formData.size) {
      setMessage("Please fill all fields.");
      return;
    }

    setMessage("Company unique filter added successfully.");
    console.log(formData);
  }

  const currentOptions =
    activePopup === "location" ? locationOptions : industryOptions;

  const filteredOptions = currentOptions.filter((item) =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="admin-form-page">
        <Link to="/admin/company-unique-filters" className="admin-back-btn">
          Back
        </Link>

        <div className="admin-form-card admin-simple-form">
          <h2>Filter Unique Companies</h2>

          <div className="admin-form-grid">
            <div className="admin-field-group admin-full-width">
              <label>Location</label>
              <input
                className="admin-input"
                type="text"
                placeholder="Select Location"
                value={formData.location}
                readOnly
                onClick={() => openPopup("location")}
              />
            </div>

            <div className="admin-field-group admin-full-width">
              <label>Industry</label>
              <input
                className="admin-input"
                type="text"
                placeholder="Select Industry"
                value={formData.industry}
                readOnly
                onClick={() => openPopup("industry")}
              />
            </div>

            <div className="admin-field-group admin-full-width">
              <label>Size</label>
              <select
                className="admin-select"
                value={formData.size}
                onChange={handleSizeChange}
              >
                <option value="">-- Select Size --</option>
                {sizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-form-btn-row">
            <button className="admin-form-btn" type="button" onClick={handleAdd}>
              Add
            </button>

            {message && <span className="admin-message-label">{message}</span>}
          </div>
        </div>

        {activePopup && (
          <>
            <div className="admin-popup-overlay" onClick={closePopup}></div>

            <div className="admin-popup-panel">
              <h3>
                Select {activePopup === "location" ? "Location" : "Industry"}
              </h3>

              <input
                type="text"
                className="admin-popup-search"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />

              <select
                className="admin-popup-select"
                value={
                  activePopup === "location"
                    ? formData.location
                    : formData.industry
                }
                onChange={(e) =>
                  selectValue(activePopup, e.target.value)
                }
              >
                {filteredOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <div className="admin-popup-actions">
                <button
                  className="admin-form-btn"
                  type="button"
                  onClick={closePopup}
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}

export default AddCompanyUniqueFilter;