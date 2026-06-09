function StatusBadge({ active }) {
  return (
    <span
      className={
        active
          ? "admin-status-badge admin-status-active"
          : "admin-status-badge admin-status-inactive"
      }
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}

export default StatusBadge;