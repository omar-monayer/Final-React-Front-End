import ActionButton from "./ActionButton";
import ExpandableCell from "./ExpandableCell";
import "../styles/table.css";
import "../styles/leadstable.css";

function LeadsTable({ leads = [], searchValue = "", filters = {}, onViewEmail }) {
  const filteredLeads = leads.filter((lead) => {
    const searchText = searchValue.toLowerCase().trim();

    const name = lead.name || "";
    const emailAddress = lead.emailAddress || "";
    const companyName = lead.companyName || "";
    const position = lead.position || "";

    const matchesSearch =
      !searchText ||
      name.toLowerCase().includes(searchText) ||
      emailAddress.toLowerCase().includes(searchText) ||
      companyName.toLowerCase().includes(searchText) ||
      position.toLowerCase().includes(searchText);

    const matchesJobTitle =
      !filters.jobTitle || position === filters.jobTitle;

    return matchesSearch && matchesJobTitle;
  });

  return (
    <div className="grid-wrapper">
      <table className="grid leads-grid" id="leadsGrid">
        <thead className="grid-header">
          <tr>
            <th>Email</th>
            <th>User Email</th>
            <th>LinkedIn</th>
            <th>Name</th>
            <th>Company Name</th>
            <th>Job Title</th>
            <th>Last Contacted</th>
            <th>Clicked</th>
            <th>Opened</th>
          </tr>
        </thead>

        <tbody>
          {filteredLeads.map((lead, index) => (
            <tr key={lead.id} className={index % 2 === 0 ? "grid-alt" : ""}>
              <td>
                <ActionButton
                  onClick={() => {
                    console.log("View clicked:", lead);

                    onViewEmail({
                      subject: lead.emailSubject || "No subject",
                      body: lead.emailContent || "No email content found.",
                      lastContacted: lead.lastContacted || "Not contacted yet",
                    });
                  }}
                >
                  View
                </ActionButton>
              </td>

              <td>{lead.emailAddress}</td>

              <ExpandableCell link={lead.linkedinUrl} />

              <td>{lead.name}</td>

              <td>{lead.companyName}</td>

              <td>{lead.position}</td>

              <td>{lead.lastContacted}</td>
              <td>{lead.clicked ? "Yes" : "No"}</td>
              <td>{lead.opened ? "Yes" : "No"}</td>
            </tr>
          ))}

          {filteredLeads.length === 0 && (
            <tr>
              <td colSpan="9" className="empty-row">
                No leads found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeadsTable;