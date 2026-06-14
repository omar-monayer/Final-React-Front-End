import { Navigate, Outlet } from "react-router-dom";
import { getLoggedUser } from "./authService";

function ProtectedRoute() {
  const user = getLoggedUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;