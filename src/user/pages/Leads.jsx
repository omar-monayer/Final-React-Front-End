import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import PagePanel from "../components/PagePanel";
import LeadsActions from "../components/LeadsActions";
import LeadsTable from "../components/LeadsTable";
import EmailPreviewModal from "../components/EmailPreviewModal";
import { getLoggedUser } from "../../auth/authService";
import API_URL from "../../config/api";

function Leads() {
  const [searchParams] = useSearchParams();

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState({
    jobTitle: "",
  });

  const [selectedEmail, setSelectedEmail] = useState(null);

  const comscId = searchParams.get("comscId");

  useEffect(() => {
    async function loadLeads() {
      try {
        setLoading(true);
        setMessage("");

        const user = getLoggedUser();

        if (!user || !user.email) {
          setMessage("No logged-in user found.");
          setLeads([]);
          return;
        }

        let url = `${API_URL}/api/user/leads?email=${encodeURIComponent(
          user.email
        )}`;

        if (comscId) {
          url += `&comscId=${encodeURIComponent(comscId)}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Failed to load leads.");
          setLeads([]);
          return;
        }

        setLeads(data);
      } catch (error) {
        setMessage(error.message);
        setLeads([]);
      } finally {
        setLoading(false);
      }
    }

    loadLeads();
  }, [comscId]);

  return (
    <PagePanel title={comscId ? "Selected Company Leads" : "Leads"}>
      <LeadsActions
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        filters={filters}
        setFilters={setFilters}
      />

      {message && <p>{message}</p>}

      {loading ? (
        <p>Loading leads...</p>
      ) : (
        <LeadsTable
          leads={leads}
          searchValue={searchValue}
          filters={filters}
          onViewEmail={setSelectedEmail}
        />
      )}

      {selectedEmail && (
        <EmailPreviewModal
          email={selectedEmail}
          onClose={() => setSelectedEmail(null)}
        />
      )}
    </PagePanel>
  );
}

export default Leads;