import AppText from "~/components/general/AppText/AppText";
import type { icons } from "~/components/icon";
import Icon from "~/components/icon";
import "./styles.css";
import { NavLink, useOutletContext } from "react-router";
import { useEffect, useState } from "react";
import { cn } from "~/libs/twMerge";
import { useAuth } from "~/libs/auth";
import { FileService } from "~/services/fileService";

type SidebarItem = {
  label: string;
  icon: keyof typeof icons;
  link: string;
};

const appItems = [
  // {
  //   label: "Dashboard",
  //   icon: "DashboardIcon",
  //   link: "/",
  // },
  {
    label: "Planning",
    icon: "PlanningIcon",
    link: "planning",
  },
  {
    label: "Club",
    icon: "ClubIcon",
    link: "club",
  },
  {
    label: "Membres",
    icon: "MembreIcon",
    link: "membre",
  },
] satisfies SidebarItem[];

const profilItems = [
  {
    label: "Mon Profil",
    icon: "ProfileIcon",
    link: "profile",
  },
  // {
  //   label: "Aide",
  //   icon: "HelpIcon",
  //   link: "help",
  // },
  {
    label: "Deconnexion",
    icon: "LogoutIcon",
    link: "/auth/login",
  },
] satisfies SidebarItem[];

interface Props {}

const Sidebar = ({}: Props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { logout } = useAuth();
  const data = useOutletContext() as any;
  const role = data?.role;
  const imgProfileId = JSON.parse(localStorage.getItem("user")!)?.user.profile;

  const filteredItems = appItems.filter((item) => {
    if (
      role === "LICENSED" &&
      (item.label === "Membres" || item.label === "Club")
    ) {
      return false;
    }
    return true;
  });

  // useLayoutEffect(() => {
  //   const filteredItems = appItems.filter((item) => {
  //     if (
  //       role === "LICENSED" &&
  //       (item.label === "Membres" || item.label === "Club")
  //     ) {
  //       return false;
  //     }
  //     return true;
  //   });
  //   setItemsSidebar(filteredItems);
  // }, []);

  return (
    <>
      <div
        className="nav-mobile cursor-pointer lg:hidden flex flex-col justify-center items-end pr-4 gap-2 w-full h-full"
        onClick={() => setOpenMenu(true)}
      >
        <div className="w-[32px] h-[3px] bg-white rounded"></div>
        <div className="w-[32px] h-[3px] bg-white rounded"></div>
        <div className="w-[32px] h-[3px] bg-white rounded"></div>
      </div>
      <nav
        className={cn([
          "nav flex flex-col h-full w-full lg:w-[94px] fixed z-[1000] top-0 left-0 translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out",
          openMenu && "translate-x-0",
        ])}
      >
        <div className="flex items-center justify-center mx-2 py-6 border-b-1 border-gray">
          <Icon name="BeaseIcon" />
        </div>
        <div
          className="cursor-pointer absolute top-6 right-4 lg:hidden"
          onClick={() => setOpenMenu(false)}
        >
          <Icon name="CloseIcon" />
        </div>
        <ul className="py-4 cursor-pointer">
          {filteredItems.map((item, idx) => (
            <li key={`sidebaritem-${idx}`}>
              <NavLink
                to={item.link}
                className={({ isActive, isPending }) => {
                  const defaultClassName =
                    "py-3.5 flex flex-col items-center gap-2";
                  const activeState = isActive
                    ? "active transition-colors duration-200 ease-out"
                    : isPending
                      ? "pending"
                      : "";
                  return defaultClassName + " " + activeState;
                }}
                onClick={() => setOpenMenu(false)}
              >
                <Icon name={item.icon} />
                <AppText color="white" weight="normal" size="xs">
                  {item.label}
                </AppText>
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="py-4 profile">
          {profilItems.map((item, idx) => (
            <li key={`appitem-${idx}`}>
              <NavLink
                to={item.link}
                className="py-3.5 flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => {
                  setOpenMenu(false);
                  if (item.label === "Deconnexion") {
                    logout();
                  }
                }}
              >
                {item.label === "Mon Profile" && imgProfileId ? (
                  <img
                    src={`${
                      import.meta.env.VITE_API_URL
                    }files/image/${imgProfileId}`}
                    alt="profile"
                    className="w-[54px] h-[54px] rounded-[50%]"
                  />
                ) : (
                  <Icon name={item.icon} />
                )}

                <AppText color="white" weight="normal" size="xs">
                  {item.label}
                </AppText>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
