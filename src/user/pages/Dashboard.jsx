import { useEffect, useState } from "react";

import PagePanel from "../components/PagePanel";
import DashboardActions from "../components/DashboardActions";
import DashboardTable from "../components/DashboardTable";
import { getLoggedUser } from "../../auth/authService";
import API_URL from "../../config/api";

function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadDashboardCompanies() {
      try {
        setLoading(true);
        setMessage("");

        const user = getLoggedUser();

        if (!user || !user.email) {
          setMessage("No logged-in user found.");
          setCompanies([]);
          return;
        }

        const response = await fetch(
          `${API_URL}/api/user/dashboard-companies?email=${encodeURIComponent(
            user.email
          )}`
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Failed to load dashboard data.");
          setCompanies([]);
          return;
        }

        setCompanies(data);
      } catch (error) {
        setMessage(error.message);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardCompanies();
  }, []);

  return (
    <PagePanel title="Dashboard">
      <DashboardActions />

      {message && <p>{message}</p>}

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <DashboardTable companies={companies} />
      )}
    </PagePanel>
  );
}

export default Dashboard;