import ActionButton from "./ActionButton";
import ExpandableCell from "./ExpandableCell";
import "../styles/table.css";
import "../styles/leadstable.css";

function LeadsTable({ leads, searchValue = "", filters = {}, onViewEmail }) {
  const filteredLeads = leads.filter((lead) => {
    const searchText = searchValue.toLowerCase().trim();

    const matchesSearch =
      !searchText ||
      lead.firstName.toLowerCase().includes(searchText) ||
      lead.lastName.toLowerCase().includes(searchText) ||
      lead.companyFull.toLowerCase().includes(searchText);

    const matchesJobTitle =
      !filters.jobTitle || lead.jobTitleFull === filters.jobTitle;

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
            <th>First Name</th>
            <th>Last Name</th>
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
                  onClick={() =>
                    onViewEmail({
                      subject: lead.emailSubject,
                      body: lead.emailBody,
                      lastContacted: lead.lastContacted,
                    })
                  }
                >
                  View
                </ActionButton>
              </td>

              <td>{lead.userEmail}</td>

              <ExpandableCell link={lead.linkedinUrl} />

              <td>{lead.firstName}</td>
              <td>{lead.lastName}</td>

              <ExpandableCell
                shortText={lead.companyShort}
                fullText={lead.companyFull}
              />

              <ExpandableCell
                shortText={lead.jobTitleShort}
                fullText={lead.jobTitleFull}
              />

              <td>{lead.lastContacted}</td>
              <td>{lead.clicked}</td>
              <td>{lead.opened}</td>
            </tr>
          ))}

          {filteredLeads.length === 0 && (
            <tr>
              <td colSpan="10" className="empty-row">
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