import { useState } from "react";
import ActionButton from "./ActionButton";
import "../styles/leadsfiltermodal.css";

function LeadsFilterModal({ isOpen, onClose, onApply }) {
  const [jobTitle, setJobTitle] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) {
    return null;
  }

  function handleApply() {
    if (!jobTitle) {
      setMessage("No filter selected. Showing all results.");
    } else {
      setMessage("Filter applied.");
    }

    if (onApply) {
      onApply({
        jobTitle,
      });
    }

    onClose();
  }

  function handleOverlayClick(event) {
    if (event.target.className === "leads-filter-modal") {
      onClose();
    }
  }

  return (
    <div className="leads-filter-modal" onClick={handleOverlayClick}>
      <div className="leads-filter-modal-content">
        <button className="modal-close" type="button" onClick={onClose}>
          &times;
        </button>

        <h3>Apply Filters</h3>

        <form>
          <div className="leads-filter-row">
            <div className="filter-item">
              <label>Job Title</label>

              <select
                name="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              >
                <option value="">All</option>
                <option value="Business Development Manager">
                  Business Development Manager
                </option>
                <option value="Marketing Director">Marketing Director</option>
                <option value="Sales Manager">Sales Manager</option>
              </select>
            </div>
          </div>

          {message && <div className="leads-filter-message">{message}</div>}

          <ActionButton onClick={handleApply}>Apply</ActionButton>
        </form>
      </div>
    </div>
  );
}

export default LeadsFilterModal;