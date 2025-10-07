import { PlusIcon } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import Icon from "~/components/icon";
import { Checkbox } from "~/components/ui/checkbox";
import { SelectAllContext } from "~/hooks/useSelectedAllContext";

interface Props {
  setSelectAllState: (value: boolean) => void;
}

function ImportAndAdd({ setSelectAllState }: Props) {
  const navigate = useNavigate();
  const context = useOutletContext();

  return (
    <>
      <div className="flex flex-col items-end lg:justify-end gap-3 mt-5">
        <div className="flex flex-col lg:flex-row gap-3">
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
        {context === "ADMIN" && (
          <div className="flex flex-col gap-3 justify-end self-end">
            <AppButton
              variant="outlined"
              type="button"
              onClick={() => navigate("delete-selected")}
            >
              Supprimer les matchs selectionnées
            </AppButton>
            <div className="flex items-center gap-1 self-end">
              <Checkbox
                id="select-all"
                onCheckedChange={(e) => setSelectAllState(Boolean(e))}
              />
              <label htmlFor="select-all">
                <AppText weight="semibold">Tout selectionner</AppText>
              </label>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ImportAndAdd;
