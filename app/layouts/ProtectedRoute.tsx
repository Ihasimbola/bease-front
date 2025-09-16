import { useEffect } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigation,
  useOutlet,
  useOutletContext,
} from "react-router";
import { cn } from "~/lib/utils";
import { useAuth } from "~/libs/auth";

interface Props {
  children: React.ReactElement;
}

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const data = useOutletContext() as any;
  const role = data?.role;

  if (isLoading) {
    // Still verifying token—show a spinner or message
    return <div>Loading authentication status…</div>;
  }

  // If logged in, render child routes; otherwise redirect to /login
  return isAuthenticated ? (
    <>
      <div>
        <Outlet context={role} />
      </div>
    </>
  ) : (
    <Navigate to="/auth/login" replace />
  );
};
