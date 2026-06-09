import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "../../styles/adminforms.css";

const industryOptions = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Healthcare" },
  { id: 3, name: "Construction" },
  { id: 4, name: "Marketing" },
  { id: 5, name: "Real Estate" },
  { id: 6, name: "Finance" },
  { id: 7, name: "Education" },
  { id: 8, name: "Retail" },
];

function AddIndustry() {
  const [industry, setIndustry] = useState("");
  const [industryId, setIndustryId] = useState("");
  const [message, setMessage] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredIndustries = industryOptions.filter((item) =>
    item.name.toLowerCase().includes(industry.toLowerCase())
  );

  function handleIndustryChange(event) {
    const value = event.target.value;

    setIndustry(value);
    setIndustryId("");

    if (value.trim().length >= 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }

  function selectIndustry(item) {
    setIndustry(item.name);
    setIndustryId(item.id);
    setShowSuggestions(false);
  }

  function handleAdd() {
    if (industry.trim() === "") {
      setMessage("Please select an industry.");
      return;
    }

    setMessage("Industry added successfully.");
    console.log({
      industry,
      industryId,
    });
  }

  return (
    <AdminLayout>
      <div className="admin-form-page">
        <Link to="/admin/industry" className="admin-back-btn">
          Back
        </Link>

        <div className="admin-form-card admin-compact-form">
          <h2>Filter Industry</h2>

          <div className="admin-field-group">
            <label>Industry:</label>

            <div className="admin-suggestions-wrap">
              <input
                className="admin-input"
                type="text"
                placeholder="Start typing industry..."
                autoComplete="off"
                value={industry}
                onChange={handleIndustryChange}
                onFocus={() => {
                  if (industry.trim().length >= 2) {
                    setShowSuggestions(true);
                  }
                }}
              />

              {showSuggestions && filteredIndustries.length > 0 && (
                <ul className="admin-suggestions-list">
                  {filteredIndustries.map((item) => (
                    <li key={item.id} onClick={() => selectIndustry(item)}>
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="admin-form-btn-row">
            <button className="admin-form-btn" type="button" onClick={handleAdd}>
              Add
            </button>

            {message && <span className="admin-message-label">{message}</span>}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddIndustry;