import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PagePanel from "./components/PagePanel";
import ActionButton from "./components/ActionButton";
import DashboardActions from "./components/DashboardActions";
import DashboardTable from "./components/DashboardTable";
import { companies } from "./data/companies";
import CompaniesActions from "./components/CompaniesActions";
import SearchInput from "./components/SearchInput";
import FilterModal from "./components/FilterModal";
import CompaniesTable from "./components/CompaniesTable";
import { companiesPageData } from "./data/companiesPageData";
import EmailPreviewModal from "./components/EmailPreviewModal";
import LeadsFilterModal from "./components/LeadsFilterModal";
import { leadsData } from "./data/leadsData";
import LeadsActions from "./components/LeadsActions";
import LeadsTable from "./components/LeadsTable";

function Home() {
  return (
    <PagePanel title="Dashboard">
      <DashboardActions />
      <DashboardTable companies={companies} />
    </PagePanel>
  );
}

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

  function handleApplyFilters(selectedFilters) {
    setFilters(selectedFilters);
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
        onApply={handleApplyFilters}
      />
    </PagePanel>
  );
}

function Leads() {
  const [searchValue, setSearchValue] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filters, setFilters] = useState({
    jobTitle: "",
  });

  function handleExport() {
    alert("Export to Excel clicked for Leads.xlsx");
  }

  return (
    <PagePanel title="Leads">
      <LeadsActions
        searchValue={searchValue}
        onSearchChange={(e) => setSearchValue(e.target.value)}
        onFilterClick={() => setIsFilterOpen(true)}
        onExportClick={handleExport}
      />

      <LeadsTable
        leads={leadsData}
        searchValue={searchValue}
        filters={filters}
        onViewEmail={setSelectedEmail}
      />

      <LeadsFilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={(selectedFilters) => setFilters(selectedFilters)}
      />

      <EmailPreviewModal
        isOpen={selectedEmail !== null}
        email={selectedEmail}
        onClose={() => setSelectedEmail(null)}
      />
    </PagePanel>
  );
}




function App() {
  return (
    <>
      <Sidebar />

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/leads" element={<Leads />} />
        </Routes>
      </main>
    </>
  );
}

export default App;