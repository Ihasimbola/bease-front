import AppText from "~/components/general/AppText/AppText";
import { Outlet, useOutletContext } from "react-router";

function AllClub() {
  const context = useOutletContext();
  return (
    <section>
      <div className="flex flex-col gap-1 text-center lg:text-left">
        <AppText as="h1" weight="semibold" size="2xl">
          Planning des Clubs
        </AppText>
        <div className="flex flex-col gap-1">
          <AppText size="xs">
            Récapitulatif des prochains matchs pour chaque équipe.
          </AppText>
        </div>
      </div>
      <Outlet context={{ role: context }} />
    </section>
  );
}

export default AllClub;
