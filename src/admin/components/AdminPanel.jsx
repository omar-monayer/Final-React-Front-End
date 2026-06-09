import { Link } from "react-router-dom";

function AdminPanel({ title, addPath, children }) {
  return (
    <section className="admin-panel">
      <div className="admin-header-actions">
        <h2>{title}</h2>

        {addPath && (
          <Link to={addPath} className="admin-action-btn">
            Add
          </Link>
        )}
      </div>

      {children}
    </section>
  );
}

export default AdminPanel;