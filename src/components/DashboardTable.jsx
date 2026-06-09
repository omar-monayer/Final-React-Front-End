import ActionButton from "./ActionButton";
import ExpandableCell from "./ExpandableCell";
import "../styles/table.css";

function DashboardTable({ companies }) {
  return (
    <div className="grid-wrapper">
      <table className="grid" id="grid">
        <thead className="grid-header">
          <tr>
            <th>Email</th>
            <th>English Name</th>
            <th>Arabic Name</th>
            <th>About</th>
            <th>Service Catalog</th>
            <th>Redirect Link</th>
            <th>Number Of Leads Per Day</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((company, index) => (
            <tr
              key={company.email}
              className={index % 2 === 0 ? "grid-alt" : ""}
            >
              <td>{company.email}</td>
              <td>{company.englishName}</td>
              <td>{company.arabicName}</td>

              <ExpandableCell
                shortText={company.aboutShort}
                fullText={company.aboutFull}
              />

              <ExpandableCell
                shortText={company.serviceShort}
                fullText={company.serviceFull}
              />

              <ExpandableCell link={company.redirectLink} />

              <td>{company.leadsPerDay}</td>

              <td>
                <form className="select-form">
                  <ActionButton>Select</ActionButton>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardTable;