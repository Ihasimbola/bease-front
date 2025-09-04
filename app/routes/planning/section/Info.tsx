import { PlusIcon } from "lucide-react";
import React from "react";
import { useNavigate, useOutlet, useOutletContext } from "react-router";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import Icon from "~/components/icon";
import { useUserStore } from "~/store/userStore";

type Props = {};

function Info({}: Props) {
  const navigate = useNavigate();
  const userConnected = useUserStore((state) => state.user);
  const userConnecteRole: string | undefined = useOutletContext();

  return (
    <section className="flex flex-col lg:flex-row gap-5 items-center justify-between">
      <div className="flex flex-col gap-1 text-center lg:text-left">
        <AppText as="h1" weight="semibold" size="2xl">
          Planning du Club
        </AppText>
        <div className="flex flex-col gap-1">
          <AppText size="xs">
            Récapitulatif des prochains matchs pour chaque équipe.
          </AppText>
          <AppText size="xs">
            Vous pouvez vous inscrire pour chaque poste.
          </AppText>
        </div>
      </div>
      <div className="flex gap-3 items-end">
        {userConnecteRole !== "LICENSED" && userConnected?.club ? (
          <>
            <AppButton onClick={() => navigate("import-match")}>
              <Icon name="ImportIcon" />
              <AppText size="sm" weight="medium" color="white">
                Importer
              </AppText>
            </AppButton>
            <AppButton type="button" onClick={() => navigate("create-match")}>
              <PlusIcon size={16} />
              <AppText size="sm" color="white" weight="medium">
                Créer un match
              </AppText>
            </AppButton>
          </>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}

export default Info;
