import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";

export default function ProtectedRoute({ children, allowedRoles }) {
    const { user, profile, loading } = useAuth();

    if (loading) {
        return <Loading />;
    }

    // Belum login → redirect ke /login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Sudah login tapi profile belum ter-load
    if (!profile) {
        return <Loading />;
    }

    // Cek apakah role user ada di daftar allowedRoles
    if (allowedRoles && !allowedRoles.includes(profile.role)) {
        // Admin yang mencoba akses halaman member, atau sebaliknya
        if (profile.role === "admin") {
            return <Navigate to="/" replace />;
        }
        if (profile.role === "member") {
            return <Navigate to="/member/dashboard" replace />;
        }
        return <Navigate to="/error-403" replace />;
    }

    return children;
}
