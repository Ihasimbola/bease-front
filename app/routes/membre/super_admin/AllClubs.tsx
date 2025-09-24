import React from "react";
import { Outlet, useOutletContext } from "react-router";
import AppText from "~/components/general/AppText/AppText";

type Props = {};

const AllClubs = (props: Props) => {
  const context = useOutletContext();

  return (
    <section>
      <div className="mb-4 flex flex-col gap-1">
        <AppText as="h1" weight="bold" size="2xl">
          Les membres
        </AppText>
        <AppText size="xs" color="gray">
          Les informations concernants les membres des clubs
        </AppText>
      </div>
      <Outlet context={{ role: context }} />
    </section>
  );
};

export default AllClubs;
