function SizeTable({ rows }) {
  return (
    <div className="admin-grid-wrapper">
      <table className="admin-grid">
        <thead className="admin-grid-header">
          <tr>
            <th>ID</th>
            <th>Size</th>
            <th>LinkedIn ID</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id} className={index % 2 === 1 ? "admin-grid-alt" : ""}>
              <td>{row.id}</td>
              <td>{row.size}</td>
              <td>{row.linkedinId}</td>
              <td>
                <button type="button" className="admin-action-btn admin-secondary-btn">
                  Edit
                </button>

                <button type="button" className="admin-action-btn admin-secondary-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SizeTable;