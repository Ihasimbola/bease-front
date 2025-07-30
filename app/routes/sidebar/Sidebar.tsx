import AppText from "~/components/general/AppText/AppText";
import type { icons } from "~/components/icon";
import Icon from "~/components/icon";
import "./styles.css";
import { Link, NavLink } from "react-router";

type SidebarItem = {
  label: string;
  icon: keyof typeof icons;
  link: string;
};

const appItems = [
  {
    label: "Dashboard",
    icon: "DashboardIcon",
    link: "/",
  },
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
  {
    label: "Aide",
    icon: "HelpIcon",
    link: "help",
  },
  {
    label: "Deconnexion",
    icon: "LogoutIcon",
    link: "logour",
  },
] satisfies SidebarItem[];

interface Props {}

const Sidebar = () => {
  return (
    <nav className="nav h-screen fixed top-0 left-0">
      <div className="flex items-center justify-center mx-2 py-6 border-b-1 border-gray">
        <Icon name="BeaseIcon" />
      </div>
      <ul className="py-4 cursor-pointer">
        {appItems.map((item, idx) => (
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
            >
              <Icon name={item.icon} />
              <AppText color="white" weight="normal" size="xs">
                {item.label}
              </AppText>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
