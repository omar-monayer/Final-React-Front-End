import AdminLayout from "../components/AdminLayout";
import AdminPanel from "../components/AdminPanel";
import LocationTable from "../components/LocationTable";
import { locationData } from "../data/locationData";

function LocationDashboard() {
  return (
    <AdminLayout>
      <AdminPanel title="Location Data" addPath="/admin/location/add">
        <LocationTable rows={locationData} />
      </AdminPanel>
    </AdminLayout>
  );
}

export default LocationDashboard;