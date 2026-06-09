import { useState } from "react";
import PagePanel from "../components/PagePanel";
import CompaniesActions from "../components/CompaniesActions";
import CompaniesTable from "../components/CompaniesTable";
import FilterModal from "../components/FilterModal";
import { companiesPageData } from "../data/companiesPageData";

function Companies() {
  const [searchValue, setSearchValue] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    country: "",
    state: "",
    industry: "",
    size: "",
  });

  function handleExport() {
    alert("Export to Excel clicked for Companies.xlsx");
  }

  return (
    <PagePanel title="Companies">
      <CompaniesActions
        searchValue={searchValue}
        onSearchChange={(e) => setSearchValue(e.target.value)}
        onFilterClick={() => setIsFilterOpen(true)}
        onExportClick={handleExport}
      />

      <CompaniesTable
        companies={companiesPageData}
        searchValue={searchValue}
        filters={filters}
      />

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={(selectedFilters) => setFilters(selectedFilters)}
      />
    </PagePanel>
  );
}

export default Companies;