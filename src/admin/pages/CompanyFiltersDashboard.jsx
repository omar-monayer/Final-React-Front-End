import AdminLayout from "../components/AdminLayout";
import AdminPanel from "../components/AdminPanel";
import CompanyFiltersTable from "../components/CompanyFiltersTable";
import { companyFiltersData } from "../data/companyFiltersData";

function CompanyFiltersDashboard() {
  return (
    <AdminLayout>
      <AdminPanel
        title="Company Filters Data"
        addPath="/admin/company-filters/add"
      >
        <CompanyFiltersTable rows={companyFiltersData} />
      </AdminPanel>
    </AdminLayout>
  );
}

export default CompanyFiltersDashboard;