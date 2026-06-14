import { useState } from "react";
import StatusBadge from "./StatusBadge";

function CompanyFiltersTable({ rows, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleEdit(row) {
    setEditingId(row.id);

    setEditData({
      ...row,
      password: "",
    });

    setError("");
  }

  function handleCancel() {
    setEditingId(null);
    setEditData({});
    setError("");
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleUpdate() {
    try {
      setSaving(true);
      setError("");

      await onUpdate(editingId, editData);

      setEditingId(null);
      setEditData({});
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }
  async function handleDelete(id) {
  await onDelete(id);

  // reset table edit mode after delete
  setEditingId(null);
  setEditData({});
  setError("");
}

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="admin-grid-wrapper">
        <table className="admin-grid">
          <thead className="admin-grid-header">
            <tr>
              <th>ID</th>
              <th>Company ID</th>
              <th>Company Name</th>
              <th>SMTP Host</th>
              <th>SMTP Port</th>
              <th>Sender</th>
              <th>Alias</th>
              <th>Password</th>
              <th>Email Signature</th>
              <th>Proposal Info</th>
              <th>Leads per Month</th>
              <th>Calendly</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => {
              const isEditing = editingId === row.id;

              return (
                <tr
                  key={row.id}
                  className={index % 2 === 1 ? "admin-grid-alt" : ""}
                >
                  <td>{row.id}</td>

                  <td>{row.companyId}</td>

                  <td>{row.companyName}</td>

                  <td>
                    {isEditing ? (
                      <input
                        name="smtpHost"
                        value={editData.smtpHost || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      row.smtpHost
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        name="smtpPort"
                        type="number"
                        value={editData.smtpPort || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      row.smtpPort
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        name="sender"
                        value={editData.sender || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      row.sender
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        name="alias"
                        value={editData.alias || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      row.alias
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        name="password"
                        type="password"
                        placeholder="Leave empty"
                        value={editData.password || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      row.password
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <textarea
                        name="emailSignature"
                        value={editData.emailSignature || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      row.emailSignature
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <textarea
                        name="proposalInfo"
                        value={editData.proposalInfo || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      row.proposalInfo
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        name="leadsPerMonth"
                        type="number"
                        value={editData.leadsPerMonth || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      row.leadsPerMonth
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        name="calendly"
                        value={editData.calendly || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      row.calendly
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        name="active"
                        type="checkbox"
                        checked={Boolean(editData.active)}
                        onChange={handleChange}
                      />
                    ) : (
                      <StatusBadge active={row.active} />
                    )}
                  </td>

                  

                 

                  <td>
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          className="admin-action-btn admin-secondary-btn"
                          onClick={handleUpdate}
                          disabled={saving}
                        >
                          {saving ? "Updating..." : "Update"}
                        </button>

                        <button
                          type="button"
                          className="admin-action-btn admin-secondary-btn"
                          onClick={handleCancel}
                          disabled={saving}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="admin-action-btn admin-secondary-btn"
                          onClick={() => handleEdit(row)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="admin-action-btn admin-secondary-btn"
                          onClick={() => onDelete(row.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CompanyFiltersTable;