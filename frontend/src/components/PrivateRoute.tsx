import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


interface JwtPayload {
  exp?: number;
  [key: string]: any;
}

interface PrivateRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  redirectPath = '/login' 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const now = Date.now() / 1000;
    
        if (decoded.exp && decoded.exp > now) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsAuthenticated(false);
        }
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;