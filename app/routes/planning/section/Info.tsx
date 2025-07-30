import React from "react";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import Icon from "~/components/icon";

type Props = {};

function Info({}: Props) {
  return (
    <section className="flex justify-between">
      <div className="flex flex-col gap-1">
        <AppText as="h1" weight="semibold" size="2xl">
          Planning du Club
        </AppText>
        <AppText size="xs">
          Récapitulatif des prochains matchs pour chaque équipe. Vous pouvez
          vous inscrire pour chaque poste.
        </AppText>
      </div>
      <div className="flex gap-3 items-end">
        <AppButton>
          <Icon name="ImportIcon" />
          <AppText size="sm" weight="medium" color="white">
            Importer
          </AppText>
        </AppButton>
        <AppButton>
          <Icon name="ExportIcon" />
          <AppText size="sm" color="white" weight="medium">
            Exporter
          </AppText>
        </AppButton>
      </div>
    </section>
  );
}

export default Info;
