import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "../../styles/adminforms.css";

const locationOptions = [
  { id: 1, name: "Amman, Jordan" },
  { id: 2, name: "Dubai, UAE" },
  { id: 3, name: "Riyadh, Saudi Arabia" },
  { id: 4, name: "Jeddah, Saudi Arabia" },
  { id: 5, name: "Doha, Qatar" },
  { id: 6, name: "Abu Dhabi, UAE" },
  { id: 7, name: "Cairo, Egypt" },
  { id: 8, name: "Dammam, Saudi Arabia" },
];

function AddLocation() {
  const [location, setLocation] = useState("");
  const [locationId, setLocationId] = useState("");
  const [message, setMessage] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredLocations = locationOptions.filter((item) =>
    item.name.toLowerCase().includes(location.toLowerCase())
  );

  function handleLocationChange(event) {
    const value = event.target.value;

    setLocation(value);
    setLocationId("");

    if (value.trim().length >= 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }

  function selectLocation(item) {
    setLocation(item.name);
    setLocationId(item.id);
    setShowSuggestions(false);
  }

  function handleAdd() {
    if (location.trim() === "") {
      setMessage("Please select a location.");
      return;
    }

    setMessage("Location added successfully.");
    console.log({
      location,
      locationId,
    });
  }

  return (
    <AdminLayout>
      <div className="admin-form-page">
        <Link to="/admin/location" className="admin-back-btn">
          Back
        </Link>

        <div className="admin-form-card admin-compact-form">
          <h2>Filter Location</h2>

          <div className="admin-field-group">
            <label>Location:</label>

            <div className="admin-suggestions-wrap">
              <input
                className="admin-input"
                type="text"
                placeholder="Start typing location..."
                autoComplete="off"
                value={location}
                onChange={handleLocationChange}
                onFocus={() => {
                  if (location.trim().length >= 2) {
                    setShowSuggestions(true);
                  }
                }}
              />

              {showSuggestions && filteredLocations.length > 0 && (
                <ul className="admin-suggestions-list">
                  {filteredLocations.map((item) => (
                    <li key={item.id} onClick={() => selectLocation(item)}>
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

export default AddLocation;