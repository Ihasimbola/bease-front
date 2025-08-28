import React, { type ReactNode } from "react";
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

interface Props {
  children: ReactNode;
}

function AppLayouts({ children }: Props) {
  const userStore = useUserStore((state) => state.admin);
  const navigation = useNavigation();

  return (
    <>
      <AuthProvider>
        <Sidebar />
        <div className="relative">
          <div
            className={cn([
              "",
              navigation.state === "loading"
                ? "fixed flex items-center justify-center z-[1400] opacity-35 w-screen h-screen bg-black transition-all duration-300 ease-in-out"
                : "hidden",
            ])}
          >
            <Loader2
              size={74}
              strokeWidth={2}
              color="white"
              className="animate-spin duratiion-300"
            />
          </div>
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

export default AppLayouts;
