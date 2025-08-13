import { CrossIcon, TriangleAlert, X } from "lucide-react";
import React from "react";
import Dialog from "~/components/common/dialog/Dialog";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import Icon from "~/components/icon";
import "./styles.css";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

function ImportExcelDialog(props: Props) {
  const { isOpen, setIsOpen } = props;
  const excelRef = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<{
    name: string;
    size: string;
  }>();

  const handleBrowseFile = () => {
    if (excelRef.current) {
      excelRef.current.click();
    }
  };

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = URL.createObjectURL(e.target.files![0]);

    setFile({
      name: e.target.files![0].name,
      size: e.target.files![0].size.toString(),
    });
  };

  return (
    <Dialog setIsOpen={setIsOpen} close={isOpen} className="mx-3 lg:mx-0">
      <div>
        <AppText as="h1" weight="bold">
          Importer votre fichier excel
        </AppText>
        <div className="flex gap-3 items-center p-3 bg-amber-100 mt-3 rounded">
          <TriangleAlert color="orange" size={48} />
          <AppText size="xs">
            {`Assurez-vous bien que l' adresse email \n est bien présent pour chaque
            licencié pour l' envoi de confirmation.`}
          </AppText>
        </div>
        <div className="mt-5 file-container">
          <input
            type="file"
            onChange={handleSelectFile}
            className="hidden"
            ref={excelRef}
          />
          {!!file && (
            <div className="relative w-fit border p-2 rounded-[20px]">
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => setFile(undefined)}
              >
                <X className="close-icon" />
              </div>
              <Icon name="ExcelIcon" />
              <AppText size="xs" color="gray">
                {file.name}
              </AppText>
              <AppText size="xs" color="gray">
                {`${Number(file.size) / 1000} KB`}
              </AppText>
            </div>
          )}
          <AppButton onClick={handleBrowseFile} className="mt-3">
            Parcourir le ficher
          </AppButton>
        </div>
      </div>
    </Dialog>
  );
}

export default ImportExcelDialog;
