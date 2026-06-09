import PagePanel from "../components/PagePanel";
import DashboardActions from "../components/DashboardActions";
import DashboardTable from "../components/DashboardTable";
import { companies } from "../data/companies";

function Dashboard() {
  return (
    <PagePanel title="Dashboard">
      <DashboardActions />
      <DashboardTable companies={companies} />
    </PagePanel>
  );
}

export default Dashboard;