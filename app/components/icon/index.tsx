import BeaseIcon from "./BeaseIcon";
import BeaseMobileIcon from "./BeaseMobileIcon";
import CloseIcon from "./CloseIcon";
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
import DivisionIcon from "./DivisionIcon";
import RefereeIcon from "./RefereeIcon";
import ChronoIcon from "./ChronoIcon";
import BuvetteIcon from "./BuvetteIcon";
import MarqueurIcon from "./MarqueurIcon";
import TeamIcon from "./TeamIcon";
import MessageIcon from "./MessageIcon";
import Basketball from "./Basketball";
import UploadImgIcon from "./UploadImgIcon";
import { TrashIcon } from "lucide-react";
import ExcelIcon from "./ExcelIcon";
import NumberIcon from "./NumberIcon";

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
  BeaseMobileIcon: <BeaseMobileIcon />,
  CloseIcon: <CloseIcon />,
  DivisionIcon: <DivisionIcon />,
  RefereeIcon: <RefereeIcon />,
  MarqueurIcon: <MarqueurIcon />,
  ChronoIcon: <ChronoIcon />,
  BuvetteIcon: <BuvetteIcon />,
  TeamIcon: <TeamIcon />,
  MessageIcon: <MessageIcon />,
  Basketball: <Basketball />,
  UploadImgIcon: <UploadImgIcon />,
  TrashIcon: <TrashIcon />,
  ExcelIcon: <ExcelIcon />,
  NumberIcon: <NumberIcon />,
};
interface Props {
  name: keyof typeof icons;
  className?: string;
}
export default function Icon({ name, className }: Props) {
  return <>{icons[name]}</>;
}
