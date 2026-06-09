import { useState } from "react";
import ActionButton from "./ActionButton";
import "../styles/filtermodal.css";

function FilterModal({ isOpen, onClose, onApply }) {
  const [filters, setFilters] = useState({
    country: "",
    state: "",
    industry: "",
    size: "",
  });

  const [message, setMessage] = useState("");

  if (!isOpen) {
    return null;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  }

  function handleApply() {
    const hasFilter =
      filters.country || filters.state || filters.industry || filters.size;

    if (!hasFilter) {
      setMessage("No filters selected. Showing all results.");
    } else {
      setMessage("Filters applied.");
    }

    if (onApply) {
      onApply(filters);
    }
  }

  function handleOverlayClick(event) {
    if (event.target.className === "filter-modal") {
      onClose();
    }
  }

  return (
    <div className="filter-modal" onClick={handleOverlayClick}>
      <div className="filter-modal-content">
        <button className="close" type="button" onClick={onClose}>
          &times;
        </button>

        <h3>Apply Filters</h3>

        <form>
          <div className="filter-row">
            <div className="filter-item">
              <label>Country</label>
              <select name="country" value={filters.country} onChange={handleChange}>
                <option value="">All</option>
                <option>Jordan</option>
                <option>UAE</option>
                <option>Saudi Arabia</option>
              </select>
            </div>

            <div className="filter-item">
              <label>State</label>
              <select name="state" value={filters.state} onChange={handleChange}>
                <option value="">All</option>
                <option>Amman</option>
                <option>Dubai</option>
                <option>Riyadh</option>
              </select>
            </div>
          </div>

          <div className="filter-row">
            <div className="filter-item">
              <label>Industry</label>
              <select
                name="industry"
                value={filters.industry}
                onChange={handleChange}
              >
                <option value="">All</option>
                <option>Technology</option>
                <option>Construction</option>
                <option>Home Services</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Size</label>
              <select name="size" value={filters.size} onChange={handleChange}>
                <option value="">All</option>
                <option>1-10</option>
                <option>11-50</option>
                <option>51-200</option>
              </select>
            </div>
          </div>

          {message && <div className="filter-message">{message}</div>}

          <ActionButton onClick={handleApply}>Apply</ActionButton>
        </form>
      </div>
    </div>
  );
}

export default FilterModal;