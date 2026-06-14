import { useNavigate } from "react-router-dom";

import ActionButton from "./ActionButton";
import ExpandableCell from "./ExpandableCell";
import "../styles/table.css";

function CompaniesTable({ companies = [], searchValue = "", filters = {} }) {
  const navigate = useNavigate();

  function handleSelectCompany(company) {
    navigate(`/leads?comscId=${company.id}`);
  }

  const filteredCompanies = companies.filter((company) => {
    const searchText = searchValue.toLowerCase().trim();

    const companyName = company.companyName || "";
    const about = company.aboutFull || "";
    const websiteUrl = company.websiteUrl || "";
    const linkedinUrl = company.linkedinUrl || "";

    const matchesSearch =
      !searchText ||
      companyName.toLowerCase().includes(searchText) ||
      about.toLowerCase().includes(searchText) ||
      websiteUrl.toLowerCase().includes(searchText) ||
      linkedinUrl.toLowerCase().includes(searchText);

    const matchesCountry =
      !filters.country || company.country === filters.country;

    const matchesState = !filters.state || company.state === filters.state;

    const matchesIndustry =
      !filters.industry || company.industry === filters.industry;

    const matchesSize = !filters.size || company.size === filters.size;

    return (
      matchesSearch &&
      matchesCountry &&
      matchesState &&
      matchesIndustry &&
      matchesSize
    );
  });

  return (
    <div className="grid-wrapper">
      <table className="grid" id="companiesGrid">
        <thead className="grid-header">
          <tr>
            <th>Company Name</th>
            <th>About</th>
            <th>Website Url</th>
            <th>LinkedIn</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredCompanies.map((company, index) => (
            <tr
              key={company.id}
              className={index % 2 === 0 ? "grid-alt" : ""}
            >
              <td>{company.companyName}</td>

              <ExpandableCell
                shortText={company.aboutShort}
                fullText={company.aboutFull}
              />

              <ExpandableCell link={company.websiteUrl} />

              <ExpandableCell link={company.linkedinUrl} />

              <td>
                <ActionButton onClick={() => handleSelectCompany(company)}>
                  Select
                </ActionButton>
              </td>
            </tr>
          ))}

          {filteredCompanies.length === 0 && (
            <tr>
              <td colSpan="5" className="empty-row">
                No companies found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CompaniesTable;