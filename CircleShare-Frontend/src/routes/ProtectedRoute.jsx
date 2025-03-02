import { useAuthContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ requiredRole }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If role is required and doesn't match, redirect user
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
