import { useOutletContext } from "react-router";
import AppText from "~/components/general/AppText/AppText";
import { useUserStore } from "~/store/userStore";
import ImportAndAdd from "../ImportAndAdd";

interface Props {
  setSelectAllState: (value: boolean) => void;
}

function Info({ setSelectAllState }: Props) {
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
          <ImportAndAdd setSelectAllState={setSelectAllState} />
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}

export default Info;
