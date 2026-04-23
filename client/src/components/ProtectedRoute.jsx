import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { getStoredToken } from "../utils/authStorage";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const token = getStoredToken();

  if (loading) return <div className="container py-5 text-center">Loading...</div>;

  if (!user || !token) return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  return children;
}
