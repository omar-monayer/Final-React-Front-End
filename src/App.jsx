import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PagePanel from "./components/PagePanel";
import DashboardActions from "./components/DashboardActions";

function Home() {
  return (
    <PagePanel title="Dashboard">
      <DashboardActions />
    </PagePanel>
  );
}

function Companies() {
  return (
    <PagePanel title="Companies">
      <p>Companies content will go here.</p>
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