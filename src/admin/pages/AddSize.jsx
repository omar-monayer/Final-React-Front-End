import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import "../../styles/adminforms.css";

function AddSize() {
  const [formData, setFormData] = useState({
    size: "",
    linkedinId: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAdd() {
    if (!formData.size.trim() || !formData.linkedinId.trim()) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    setMessage("Size added successfully.");
    setMessageType("success");

    console.log(formData);
  }

  return (
    <AdminLayout>
      <div className="admin-form-page">
        <Link to="/admin/size" className="admin-back-btn">
          Back
        </Link>

        <div className="admin-form-card admin-compact-form">
          <h2>Filter Size</h2>

          <div className="admin-field-group">
            <label>Size:</label>
            <input
              name="size"
              className="admin-input"
              type="text"
              placeholder="Enter Size"
              value={formData.size}
              onChange={handleChange}
            />
          </div>

          <div className="admin-field-group">
            <label>Linked-In ID For Size:</label>
            <input
              name="linkedinId"
              className="admin-input"
              type="text"
              placeholder="Enter LinkedIn ID"
              value={formData.linkedinId}
              onChange={handleChange}
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

export default AddSize;