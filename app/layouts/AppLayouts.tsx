import React, { use, useEffect, type ReactNode } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigation,
  useOutletContext,
} from "react-router";
import Icon from "~/components/icon";
import Pub from "~/components/layout/pub/Pub";
import AuthProvider, { useAuth } from "~/libs/auth";
import Sidebar from "~/routes/sidebar/Sidebar";
import { ProtectedRoute } from "./ProtectedRoute";
import { Toaster } from "~/components/ui/sonner";
import { useUserStore } from "~/store/userStore";
import { cn } from "~/lib/utils";
import { Loader2 } from "lucide-react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
}

function AppLayouts({ children }: Props) {
  const setUser = useUserStore((state) => state.setUser);
  const navigation = useNavigation();

  // set the connected user to the store
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")!));
    }
  }, [localStorage.getItem("user")]);

  // register the scroll event into localStorage
  useEffect(() => {
    const setScrollPositionInLocalStorage = () => {
      localStorage.setItem("scrollPosition", JSON.stringify(window.scrollY));
    };
    document.addEventListener("scrollend", setScrollPositionInLocalStorage);

    return () =>
      document.removeEventListener(
        "scrollend",
        setScrollPositionInLocalStorage
      );
  }, []);

  return (
    <>
      <AuthProvider>
        <Sidebar />
        <div className="relative">
          {navigation.state === "loading" && <AppLoader />}
          <div className="banner flex justify-start pl-32 lg:pl-[25%] items-center lg:gap-16">
            <div className="hidden lg:block">
              <Icon name="LogoBease" />
            </div>
            <Icon name="KunheimIcon" />
          </div>
          <main className="lg:ml-[94px] mb-6 pt-8 pl-6 pr-5 bg-grayblue">
            <ProtectedRoute />
            <Pub />
          </main>
        </div>
      </AuthProvider>
      <Toaster />
    </>
  );
}

function AppLoader() {
  return createPortal(
    <div
      className={cn([
        "",
        "fixed flex top-0 items-center justify-center z-[1400] opacity-35 w-screen h-screen bg-black transition-all duration-300 ease-in-out",
      ])}
    >
      <Loader2
        size={74}
        strokeWidth={2}
        color="white"
        className="animate-spin duratiion-300"
      />
    </div>,
    document.body
  );
}

export default AppLayouts;
