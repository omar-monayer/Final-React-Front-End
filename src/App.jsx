import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PagePanel from "./components/PagePanel";
import DashboardActions from "./components/DashboardActions";
import DashboardTable from "./components/DashboardTable";
import { companies } from "./data/companies";
import SearchInput from "./components/SearchInput";

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

  return (
    <PagePanel title="Companies">
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