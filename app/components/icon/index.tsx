import BeaseIcon from "./BeaseIcon";
import ClubIcon from "./ClubIcon";
import DashboardIcon from "./DashboardIcon";
import ExportIcon from "./Export";
import FacebookIcon from "./FacebookIcon";
import HelpIcon from "./HelpIcon";
import ImportIcon from "./Import";
import InstagramIcon from "./InstagramIcon";
import KunheimIcon from "./KunheimIcon";
import LogoBease from "./LogoBease";
import LogoutIcon from "./Logout";
import MembreIcon from "./MembreIcon";
import PlanningIcon from "./PlanningIcon";
import ProfileIcon from "./ProfileIcon";
import YoutubeIcon from "./YoutubeIcon";

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
  LogoBease: <LogoBease />,
  KunheimIcon: <KunheimIcon />,
  FacebookIcon: <FacebookIcon />,
  InstagramIcon: <InstagramIcon />,
  YoutubeIcon: <YoutubeIcon />,
};
interface Props {
  name: keyof typeof icons;
  className?: string;
}
export default function Icon({ name, className }: Props) {
  return <>{icons[name]}</>;
}
