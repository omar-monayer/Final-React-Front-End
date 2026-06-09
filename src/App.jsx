import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PagePanel from "./components/PagePanel";
import ActionButton from "./components/ActionButton";
import "./styles/actionbutton.css";

function Home() {
  return (
    <PagePanel title="Dashboard">
      <div className="button-group">
        <ActionButton>Analytics</ActionButton>
        <ActionButton>Export to Excel</ActionButton>
        <ActionButton>Select</ActionButton>
      </div>
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