import "./styles.css";
import { Outlet } from "react-router";

type Props = {};

function AuthLayout({}: Props) {
  return (
    <main className="auth-container h-screen w-screen grid lg:grid-cols-2">
      <Outlet />
    </main>
  );
}

export default AuthLayout;
