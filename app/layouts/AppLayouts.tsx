import React, { type ReactNode } from "react";
import { Outlet } from "react-router";
import Icon from "~/components/icon";
import Pub from "~/components/layout/pub/Pub";
import Sidebar from "~/routes/sidebar/Sidebar";

interface Props {
  children: ReactNode;
}

function AppLayouts({ children }: Props) {
  return (
    <>
      <Sidebar />
      <div className="banner flex justify-start pl-32 lg:pl-[25%] items-center lg:gap-16">
        <div className="hidden lg:block">
          <Icon name="LogoBease" />
        </div>
        <Icon name="KunheimIcon" />
      </div>
      <main className="lg:ml-[94px] mb-6 pt-8 pl-6 pr-5 bg-grayblue">
        <Outlet />
        <Pub />
      </main>
    </>
  );
}

export default AppLayouts;
