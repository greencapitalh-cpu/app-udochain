import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-udo-steel">
        Checking session…
      </div>
    );
  }

  // 🔐 Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
