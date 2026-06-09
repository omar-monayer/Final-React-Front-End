import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PagePanel from "./components/Pagepanel";

function Home() {
  return (
    <PagePanel title="Dashboard">
      <p>Dashboard content will go here.</p>
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

function NotFound() {
  return (
    <PagePanel title="Page Not Found">
      <p>This page does not exist.</p>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;