import { CrossIcon, LoaderCircle, TriangleAlert, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Dialog from "~/components/common/dialog/Dialog";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import Icon from "~/components/icon";
import "./styles.css";
import { data, useFetcher, useNavigate } from "react-router";
import type { Route } from "./+types/ImportExcelDialog";
import { FileService } from "~/services/fileService";
import { toast } from "sonner";

export async function clientAction({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const excel: any = formData.get("excel");

  if (!excel?.name) {
    return data({
      message: "Veuillez choisir un fichier",
    });
  }

  try {
    const res = await FileService.upload("files/excel/licensed", formData);
    return res;
  } catch (error: any) {
    if (error.status === 400) {
      return data(
        {
          error: {
            message: error.response.data.message,
          },
        },
        {
          status: 400,
        }
      );
    }
  }
}

function ImportExcelDialog() {
  const [isOpen, setIsOpen] = useState(true);

  const excelRef = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<{
    name: string;
    size: string;
  }>();

  const fetcher = useFetcher();
  const navigate = useNavigate();

  useEffect(() => {
    const alreadyCreated = fetcher?.data?.data?.already_created;

    if (alreadyCreated) {
      toast.success("Certains membres ont déjà un compte.");
      navigate(-1);
    }
    if (fetcher.data?.error?.message) {
      toast.error(fetcher.data.error.message);
      navigate(-1);
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (!isOpen) {
      navigate(-1);
    }
  }, [isOpen]);

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
          <div>
            <AppText size="xs">
              {`Assurez-vous bien que l' adresse email \n est bien présent pour chaque
            licencié pour l' envoi de confirmation.`}
            </AppText>
            <AppText size="xs">
              Les lignes sans email ne seront pas traitées.
            </AppText>
          </div>
        </div>

        <fetcher.Form
          className="mt-5 file-container"
          method="POST"
          encType="multipart/form-data"
        >
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleSelectFile}
            className="hidden"
            name="excel"
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
          {file ? (
            <AppButton type="submit" className="mt-3 w-full">
              {fetcher.state !== "idle" ? (
                <LoaderCircle
                  className="loader-circle"
                  id="loader-circle"
                  stroke="stroke-white"
                />
              ) : (
                "importer"
              )}
            </AppButton>
          ) : (
            <AppButton
              type="button"
              onClick={handleBrowseFile}
              className="mt-3"
            >
              Parcourir le ficher
            </AppButton>
          )}
        </fetcher.Form>
      </div>
    </Dialog>
  );
}

export default ImportExcelDialog;
