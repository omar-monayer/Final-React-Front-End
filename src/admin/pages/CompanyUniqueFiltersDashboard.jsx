import AdminLayout from "../components/AdminLayout";
import AdminPanel from "../components/AdminPanel";
import CompanyUniqueFiltersTable from "../components/CompanyUniqueFiltersTable";
import { companyUniqueFiltersData } from "../data/companyUniqueFiltersData";

function CompanyUniqueFiltersDashboard() {
  return (
    <AdminLayout>
      <AdminPanel
        title="Company Unique Filters Data"
        addPath="/admin/company-unique-filters/add"
      >
        <CompanyUniqueFiltersTable rows={companyUniqueFiltersData} />
      </AdminPanel>
    </AdminLayout>
  );
}

export default CompanyUniqueFiltersDashboard;