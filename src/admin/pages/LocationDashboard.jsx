import { useEffect, useState } from "react";

import AdminLayout from "../components/AdminLayout";
import AdminPanel from "../components/AdminPanel";
import LocationTable from "../components/LocationTable";

function LocationDashboard() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadLocations() {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/api/locations");

      if (!response.ok) {
        throw new Error("Failed to load locations");
      }

      const data = await response.json();
      setLocations(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLocations();
  }, []);

  async function handleUpdateLocation(id, updatedData) {
  const response = await fetch(`http://localhost:3000/api/locations/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update location");
  }

  setMessage("Location updated successfully.");
  await loadLocations();
}

async function handleDeleteLocation(id) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this location?"
  );

  if (!confirmDelete) {
    return;
  }

  const response = await fetch(`http://localhost:3000/api/locations/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete location");
  }

  setMessage("Location deleted successfully.");

  await loadLocations();
}

  return (
    <AdminLayout>
      <AdminPanel title="Location Data" addPath="/admin/location/add">
        {message && <p>{message}</p>}

        {loading ? (
          <p>Loading locations...</p>
        ) : (
         <LocationTable
          rows={locations}
          onUpdate={handleUpdateLocation}
          onDelete={handleDeleteLocation}
        />
        )}
      </AdminPanel>
    </AdminLayout>
  );
}

export default LocationDashboard;