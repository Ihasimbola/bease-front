import { TriangleAlert } from "lucide-react";
import AppText from "../general/AppText/AppText";
import { cn } from "~/lib/utils";

interface Props {
  className?: string;
  showWarningLogo?: boolean;
}

function ClubNameWarning({ className, showWarningLogo = true }: Props) {
  return (
    <div
      className={cn([
        "flex gap-5 items-center p-5 rounded-[20px] bg-amber-100",
        className,
      ])}
    >
      {showWarningLogo && <TriangleAlert color="orange" size={48} />}
      <div>
        <AppText weight="bold" size="xs">
          ⚠️ Important : cohérence des noms
        </AppText>
        <AppText weight="bold" size="xs" className="ml-5">
          Le nom du club saisi doit être strictement identique à celui utilisé
          dans le planning (ex. : BC Kunheim et pas Basket Club Kunheim).
        </AppText>
        <AppText weight="bold" size="xs">
          👉 Sinon, l’outil ne pourra pas reconnaître les matchs à domicile ni
          activer les fonctionnalités liées.
        </AppText>
      </div>
    </div>
  );
}

export default ClubNameWarning;
