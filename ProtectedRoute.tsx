
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    console.log('ProtectedRoute: loading =', loading, 'user =', !!user);
    
    if (loading) {
      setShouldRender(false);
      return;
    }

    // Not authenticated - redirect to signup
    if (!user) {
      console.log('ProtectedRoute: No user, redirecting to signup');
      navigate("/signup");
      setShouldRender(false);
      return;
    }

    // User is authenticated, allow rendering
    console.log('ProtectedRoute: User authenticated, rendering children');
    setShouldRender(true);
  }, [user, loading, navigate]);

  // Show loading spinner while checking auth or redirecting
  if (loading || !shouldRender) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
