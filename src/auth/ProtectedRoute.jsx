import { Navigate, Outlet } from "react-router-dom";
import { getLoggedUser } from "./authService";

function ProtectedRoute({ allowedRoles }) {
  const user = getLoggedUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "admin") {
      return <Navigate to="/admin/company-filters" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;