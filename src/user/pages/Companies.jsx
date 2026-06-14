import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import PagePanel from "../components/PagePanel";
import CompaniesActions from "../components/CompaniesActions";
import CompaniesTable from "../components/CompaniesTable";
import { getLoggedUser } from "../../auth/authService";

function Companies() {
  const [searchParams] = useSearchParams();

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState({
    country: "",
    state: "",
    industry: "",
    size: "",
  });

  const coflId = searchParams.get("coflId");

  useEffect(() => {
    async function loadCompanies() {
      try {
        setLoading(true);
        setMessage("");

        const user = getLoggedUser();

        if (!user || !user.email) {
          setMessage("No logged-in user found.");
          setCompanies([]);
          return;
        }

        let url = `http://localhost:3000/api/user/companies?email=${encodeURIComponent(
          user.email
        )}`;

        if (coflId) {
          url += `&coflId=${encodeURIComponent(coflId)}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Failed to load companies.");
          setCompanies([]);
          return;
        }

        setCompanies(data);
      } catch (error) {
        setMessage(error.message);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    }

    loadCompanies();
  }, [coflId]);
  
  function handleExport() {
    alert("Export to Excel clicked for Leads.xlsx");
  }


  return (
    <PagePanel title={coflId ? "Selected Companies" : "Companies"}>
      <CompaniesActions
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onExportClick={handleExport}
      />

      {message && <p>{message}</p>}

      {loading ? (
        <p>Loading companies...</p>
      ) : (
        <CompaniesTable
          companies={companies}
          searchValue={searchValue}
          filters={filters}
        />
      )}
    </PagePanel>
  );
}

export default Companies;