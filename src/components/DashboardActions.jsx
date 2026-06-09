import ActionButton from "./ActionButton";
import "../styles/dashboardactions.css";

function DashboardActions() {
  function handleExport() {
    alert("Export to Excel clicked for table: grid | File: UsersInfo.xlsx");
  }

  return (
    <div className="grid-actions">
      <div className="left-actions">
        <ActionButton>Analytics</ActionButton>
      </div>

      <div className="right-actions">
        <ActionButton onClick={handleExport}>Export to Excel</ActionButton>
      </div>
    </div>
  );
}

export default DashboardActions;