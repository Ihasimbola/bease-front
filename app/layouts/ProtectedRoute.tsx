import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "~/libs/auth";

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Still verifying token—show a spinner or message
    return <div>Loading authentication status…</div>;
  }

  // If logged in, render child routes; otherwise redirect to /login
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to="/auth/login"
      replace
      state={{ from: location }} // remember original page
    />
  );
};
