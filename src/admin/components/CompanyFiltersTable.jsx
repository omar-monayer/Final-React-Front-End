import StatusBadge from "./StatusBadge";

function CompanyFiltersTable({ rows }) {
  return (
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
            <th>Add</th>
            <th>Sort</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id} className={index % 2 === 1 ? "admin-grid-alt" : ""}>
              <td>{row.id}</td>
              <td>{row.companyId}</td>
              <td>{row.companyName}</td>
              <td>{row.smtpHost}</td>
              <td>{row.smtpPort}</td>
              <td>{row.sender}</td>
              <td>{row.alias}</td>
              <td>{row.password}</td>
              <td>{row.emailSignature}</td>
              <td>{row.proposalInfo}</td>
              <td>{row.leadsPerMonth}</td>
              <td>{row.calendly}</td>
              <td>
                <StatusBadge active={row.active} />
              </td>
              <td>
                <button type="button" className="admin-action-btn admin-secondary-btn">
                  Add
                </button>
              </td>
              <td>
                <button type="button" className="admin-action-btn admin-secondary-btn">
                  Sort
                </button>
              </td>
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

export default CompanyFiltersTable;