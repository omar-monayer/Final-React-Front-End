import StatusBadge from "./StatusBadge";

function CompanyUniqueFiltersTable({ rows }) {
  return (
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
            <th>Leads</th>
            <th>Active</th>
            <th>Done</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id} className={index % 2 === 1 ? "admin-grid-alt" : ""}>
              <td>{row.id}</td>
              <td>{row.location}</td>
              <td>{row.industry}</td>
              <td>{row.size}</td>
              <td>{row.pages}</td>
              <td>{row.extracted}</td>
              <td>{row.leads}</td>
              <td>
                <StatusBadge active={row.active} />
              </td>
              <td>{row.done}</td>
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

export default CompanyUniqueFiltersTable;