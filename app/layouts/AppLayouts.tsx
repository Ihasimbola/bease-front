import React, {
  use,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
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
import { ClubService } from "~/services/ClubService";

interface Props {
  children: ReactNode;
}

function AppLayouts({ children }: Props) {
  const setUser = useUserStore((state) => state.setUser);
  const navigation = useNavigation();
  const [emblem, setEmblem] = useState("");

  // set the connected user to the store
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")!));
    }

    const getClub = async (id: string) => {
      try {
        const res = (await ClubService.getClub(id)) as any;
        setEmblem(res.emblem);
      } catch (error) {
        throw error;
      }
    };

    // get user club
    getClub(user?.club);
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
            {emblem ? (
              <img
                src={`${import.meta.env.VITE_API_URL}files/image/${emblem}`}
                alt="emblem"
                width="150px"
                height="auto"
              />
            ) : (
              <Icon name="KunheimIcon" />
            )}
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
