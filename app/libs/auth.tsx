import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useLocation } from "react-router";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userRole?: "admin" | "user";
  login: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<"admin" | "user">();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  }, [location.pathname]);

  const login = async () => {
    // call login API, then:
    setIsAuthenticated(true);
    setUserRole("user");
  };

  const logout = () => {
    // clear token, etc.
    setIsAuthenticated(false);
    setUserRole(undefined);
    localStorage.clear();
  };

  return (
    <AuthContext
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
        userRole,
      }}
    >
      {children}
    </AuthContext>
  );
}

// Custom hook for easy access
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
