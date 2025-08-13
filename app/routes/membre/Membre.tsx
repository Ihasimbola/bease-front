import { PlusIcon, SearchIcon, Upload } from "lucide-react";
import React from "react";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import { Input } from "~/components/ui/input";
import Table from "./Table";
import ImportExcelDialog from "./ImportExcelDialog";
import { set } from "zod";

type Props = {};

function Membre({}: Props) {
  const [importExcelDialog, setImportExcelDialog] = React.useState(false);

  return (
    <section>
      <div className="lg:flex justify-between items-end">
        <div className="mb-4 flex flex-col gap-1">
          <AppText as="h1" weight="bold">
            Les membres
          </AppText>
          <AppText size="xs" color="gray">
            Les informations concernants les membres de votre club
          </AppText>
        </div>
        <div className="flex gap-4">
          <AppButton onClick={() => setImportExcelDialog(true)}>
            <Upload size={16} />
            <AppText color="white" size="xs">
              Importer un ficher excel
            </AppText>
          </AppButton>
          <AppButton>
            <PlusIcon size={16} />
            <AppText color="white" size="xs">
              Ajouter un membre
            </AppText>
          </AppButton>
        </div>
      </div>

      <div className="relative mt-6">
        <Input
          type="text"
          placeholder="Rechercher un membre..."
          className="text-xs rounded-[20px] pl-8 max-w-[450px]"
        />
        <div className="absolute top-2 left-2">
          <SearchIcon color="gray" size={16} />
        </div>
      </div>
      <Table className="mt-8" />
      <ImportExcelDialog
        isOpen={importExcelDialog}
        setIsOpen={setImportExcelDialog}
      />
    </section>
  );
}

export default Membre;
