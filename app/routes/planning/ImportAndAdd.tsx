import { PlusIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import Icon from "~/components/icon";

type Props = {};

function ImportAndAdd({}: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center lg:flex-row lg:justify-end gap-3 mt-5">
      <AppButton onClick={() => navigate("import-match")}>
        <Icon name="ImportIcon" />
        <AppText size="sm" weight="medium" color="white">
          Importer un fichier excel
        </AppText>
      </AppButton>
      <AppButton type="button" onClick={() => navigate("create-match")}>
        <PlusIcon size={16} />
        <AppText size="sm" color="white" weight="medium">
          Créer un match
        </AppText>
      </AppButton>
    </div>
  );
}

export default ImportAndAdd;
