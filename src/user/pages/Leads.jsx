import { useState } from "react";
import PagePanel from "../components/PagePanel";
import LeadsActions from "../components/LeadsActions";
import LeadsTable from "../components/LeadsTable";
import LeadsFilterModal from "../components/LeadsFilterModal";
import EmailPreviewModal from "../components/EmailPreviewModal";
import { leadsData } from "../data/leadsData";

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

export default Leads;