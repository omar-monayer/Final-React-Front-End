import { useState } from "react";

function JobTitleTable({ rows, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleEdit(row) {
    setEditingId(row.id);
    setEditData({ ...row });
    setError("");
  }

  function handleCancel() {
    setEditingId(null);
    setEditData({});
    setError("");
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value,
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
              <th>Job Title</th>
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

                  <td>
                    {isEditing ? (
                      <input
                        name="jobTitle"
                        value={editData.jobTitle || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      row.jobTitle
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
                          onClick={() => handleDelete(row.id)}
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

export default JobTitleTable;