import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, loading, children }) {
    if (loading) return <p>Cargando sesión...</p>;
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
}