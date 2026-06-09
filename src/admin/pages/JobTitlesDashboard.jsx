import AdminLayout from "../components/AdminLayout";
import AdminPanel from "../components/AdminPanel";
import JobTitlesTable from "../components/JobTitlesTable";
import { jobTitlesData } from "../data/jobTitlesData";

function JobTitlesDashboard() {
  return (
    <AdminLayout>
      <AdminPanel title="Job Titles Data" addPath="/admin/job-titles/add">
        <JobTitlesTable rows={jobTitlesData} />
      </AdminPanel>
    </AdminLayout>
  );
}

export default JobTitlesDashboard;