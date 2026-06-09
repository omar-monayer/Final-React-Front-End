import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "../../styles/adminforms.css";

function AddJobTitle() {
  const [jobTitle, setJobTitle] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  function handleAdd() {
    if (jobTitle.trim() === "") {
      setMessage("Please enter a job title.");
      setMessageType("error");
      return;
    }

    setMessage("Job title added successfully.");
    setMessageType("success");

    console.log({
      jobTitle,
    });
  }

  return (
    <AdminLayout>
      <div className="admin-form-page">
        <Link to="/admin/job-titles" className="admin-back-btn">
          Back
        </Link>

        <div className="admin-form-card admin-compact-form">
          <h2>Add Job Title</h2>

          <div className="admin-field-group">
            <label>Job Title:</label>
            <input
              className="admin-input"
              type="text"
              placeholder="Enter Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          <div className="admin-form-btn-row">
            <button className="admin-form-btn" type="button" onClick={handleAdd}>
              Add
            </button>

            {message && (
              <span
                className={
                  messageType === "error"
                    ? "admin-message-label admin-error-message"
                    : "admin-message-label"
                }
              >
                {message}
              </span>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddJobTitle;