import { cn } from "~/lib/utils";
import "./styles.css";
import { Outlet, useLocation, useNavigation, useRoutes } from "react-router";

type Props = {};

function AuthLayout({}: Props) {
  const navigation = useLocation();

  const isLogin = navigation.pathname.includes("login");

  return (
    <main
      className={cn([
        "auth-container h-screen w-screen grid",
        isLogin ? "grid-cols-1 xl:grid-cols-2" : "",
      ])}
    >
      <Outlet />
    </main>
  );
}

export default AuthLayout;
