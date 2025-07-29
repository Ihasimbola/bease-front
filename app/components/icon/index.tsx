import BeaseIcon from "./BeaseIcon";
import ClubIcon from "./ClubIcon";
import DashboardIcon from "./DashboardIcon";
import ExportIcon from "./Export";
import HelpIcon from "./HelpIcon";
import ImportIcon from "./Import";
import LogoutIcon from "./Logout";
import MembreIcon from "./MembreIcon";
import PlanningIcon from "./PlanningIcon";
import ProfileIcon from "./ProfileIcon";

export const icons = {
  BeaseIcon: <BeaseIcon />,
  DashboardIcon: <DashboardIcon />,
  PlanningIcon: <PlanningIcon />,
  ClubIcon: <ClubIcon />,
  MembreIcon: <MembreIcon />,
  ProfileIcon: <ProfileIcon />,
  HelpIcon: <HelpIcon />,
  LogoutIcon: <LogoutIcon />,
  ImportIcon: <ImportIcon />,
  ExportIcon: <ExportIcon />,
};
interface Props {
  name: keyof typeof icons;
}
export default function Icon({ name }: Props) {
  return <>{icons[name]}</>;
}
