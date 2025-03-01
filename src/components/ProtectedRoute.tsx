
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated as admin
    const adminAuth = localStorage.getItem('adminAuth');
    const isAdmin = adminAuth === 'true';
    
    setIsAuthenticated(isAdmin);
    setIsLoading(false);
    
    if (!isAdmin && location.pathname !== '/admin/login') {
      toast({
        title: "Access Denied",
        description: "Please login as admin to access this page",
        variant: "destructive",
      });
    }
  }, [location.pathname, toast]);

  if (isLoading) {
    // You could add a loading spinner here
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
