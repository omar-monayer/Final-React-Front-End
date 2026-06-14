import { useState } from "react";
import StatusBadge from "./StatusBadge";

function CompanyUniqueFiltersTable({
  rows,
  locations,
  industries,
  sizes,
  onUpdate,
  onDelete,
})  {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

 function handleEdit(row) {
  setEditingId(row.id);

  setEditData({
    ...row,
    locationId: row.locationId,
    industryId: row.industryId,
    sizeId: row.sizeId,
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
              <th>Location</th>
              <th>Industry</th>
              <th>Size</th>
              <th>Pages</th>
              <th>Extracted</th>
              <th>Leads per Month</th>
              <th>Active</th>
              <th>Done</th>
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
                      <select
                        name="locationId"
                        value={editData.locationId || ""}
                        onChange={handleChange}
                      >
                        {locations.map((location) => (
                          <option key={location.id} value={location.id}>
                            {location.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      row.location
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <select
                        name="industryId"
                        value={editData.industryId || ""}
                        onChange={handleChange}
                      >
                        {industries.map((industry) => (
                          <option key={industry.id} value={industry.id}>
                            {industry.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      row.industry
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <select
                        name="sizeId"
                        value={editData.sizeId || ""}
                        onChange={handleChange}
                      >
                        {sizes.map((size) => (
                          <option key={size.id} value={size.id}>
                            {size.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      row.size
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        name="pages"
                        type="number"
                        value={editData.pages || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      row.pages
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        name="extracted"
                        type="number"
                        value={editData.extracted || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      row.extracted
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        name="leads"
                        type="number"
                        value={editData.leads || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      row.leads
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
                      <input
                        name="done"
                        type="checkbox"
                        checked={Boolean(editData.done)}
                        onChange={handleChange}
                      />
                    ) : row.done ? (
                      "Yes"
                    ) : (
                      "No"
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

export default CompanyUniqueFiltersTable;