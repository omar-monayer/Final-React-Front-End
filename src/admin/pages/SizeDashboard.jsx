import { useEffect, useState } from "react";

import AdminLayout from "../components/AdminLayout";
import AdminPanel from "../components/AdminPanel";
import SizeTable from "../components/SizeTable";
import API_URL from "../../config/api";

function SizeDashboard() {
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadSizes() {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/sizes`);

      if (!response.ok) {
        throw new Error("Failed to load sizes");
      }

      const data = await response.json();
      setSizes(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSizes();
  }, []);

  async function handleUpdateSize(id, updatedData) {
    const response = await fetch(`${API_URL}/api/sizes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update size");
    }

    setMessage("Size updated successfully.");
    await loadSizes();
  }

  async function handleDeleteSize(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this size?"
    );

    if (!confirmDelete) {
      return;
    }

    const response = await fetch(`${API_URL}/api/sizes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete size");
    }

    setMessage("Size deleted successfully.");
    await loadSizes();
  }

  return (
    <AdminLayout>
      <AdminPanel title="Size Data" addPath="/admin/size/add">
        {message && <p>{message}</p>}

        {loading ? (
          <p>Loading sizes...</p>
        ) : (
          <SizeTable
            rows={sizes}
            onUpdate={handleUpdateSize}
            onDelete={handleDeleteSize}
          />
        )}
      </AdminPanel>
    </AdminLayout>
  );
}

export default SizeDashboard;