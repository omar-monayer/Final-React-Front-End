import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PagePanel from "./components/PagePanel";
import ActionButton from "./components/ActionButton";
import DashboardActions from "./components/DashboardActions";
import DashboardTable from "./components/DashboardTable";
import { companies } from "./data/companies";
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
  const [searchText, setSearchText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <PagePanel title="Companies">
      <ActionButton onClick={() => setIsFilterOpen(true)}>
        Filter
      </ActionButton>
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={(filters) => console.log(filters)}
      />
      <SearchInput
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search Company..."
      />

      <p>Search value: {searchText}</p>
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