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

  function handleExport() {
    alert("Export to Excel clicked for Companies.xlsx");
  }

  function handleApplyFilters(filters) {
    console.log(filters);
  }

  return (
    <PagePanel title="Companies">
      <CompaniesActions
        searchValue={searchValue}
        onSearchChange={(e) => setSearchValue(e.target.value)}
        onFilterClick={() => setIsFilterOpen(true)}
        onExportClick={handleExport}
      />

      <p>Search value: {searchValue}</p>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
      />
    </PagePanel>
  );
}

function Leads() {
  return (
    <PagePanel title="Leads">
      <p>Leads content will go here.</p>
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