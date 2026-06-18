import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07050A] text-[#D4C2A8] font-serif text-xl">
        Loading…
      </div>
    );
  }
  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
}
