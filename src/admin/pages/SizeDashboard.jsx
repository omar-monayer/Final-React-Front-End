import AdminLayout from "../components/AdminLayout";
import AdminPanel from "../components/AdminPanel";
import SizeTable from "../components/SizeTable";
import { sizeData } from "../data/sizeData";

function SizeDashboard() {
  return (
    <AdminLayout>
      <AdminPanel title="Size Data" addPath="/admin/size/add">
        <SizeTable rows={sizeData} />
      </AdminPanel>
    </AdminLayout>
  );
}

export default SizeDashboard;