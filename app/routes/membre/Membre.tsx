import { PlusIcon, SearchIcon, Upload } from "lucide-react";
import React, { useEffect, useLayoutEffect } from "react";
import AppButton from "~/components/general/AppButton/AppButton";
import AppText from "~/components/general/AppText/AppText";
import { Input } from "~/components/ui/input";
import Table from "./Table";
import ImportExcelDialog from "./ImportExcelDialog";
import AddMemberDialog from "./AddMemberDialog";
import DeleteConfirmationDialog from "./ConfirmationDialog";
import EditMemberDialog from "./EditMemberDialog";
import type { Route } from "./+types/Membre";
import { data, Outlet, useFetcher, useNavigate } from "react-router";
import { FileService } from "~/services/fileService";
import { UserService, type LicensedResponse } from "~/services/userService";
import { tableHeader } from "./tableData";
import type { TableData } from "./type";
import { toast } from "sonner";
import { useUserStore } from "~/store/userStore";

type Props = {};

export async function clientLoader() {
  const clubId = JSON.parse(localStorage.getItem("user")!)?.club;
  if (!clubId) {
    return {
      membres: [],
      message: "Vous n' avez pas encore créé un club",
    };
  }
  const { data: membres } = await UserService.getLicensedByClub(clubId);

  const data: TableData[] = membres.map((membre: LicensedResponse) => ({
    firstname: membre.user.firstname,
    lastname: membre.user.lastname,
    age: membre.age,
    category: membre.category.name,
    isConfirmed: membre.isConfirmed,
    gender: membre.gender,
    _id: membre._id,
  }));
  return {
    membres: data,
  };
}

function Membre({ loaderData }: Route.ComponentProps) {
  const [importExcelDialog, setImportExcelDialog] = React.useState(false);
  const [addMembreDialog, setAddMembreDialog] = React.useState(false);
  const [deleteConfirmationDialog, setDeleteConfirmationDialog] =
    React.useState(false);
  const [editMembreDialog, setEditMembreDialog] = React.useState(false);
  const navigate = useNavigate();
  const { membres, message } = loaderData;

  useLayoutEffect(() => {
    if (message) {
      toast.error(message);
      navigate("/club");
    }
  }, [loaderData]);

  const hanleOnDelete = () => {
    setDeleteConfirmationDialog(true);
  };

  const handleOnEdit = () => {
    setEditMembreDialog(true);
  };

  return (
    <section>
      <div className="lg:flex justify-between items-end">
        <div className="mb-4 flex flex-col gap-1">
          <AppText as="h1" weight="bold" size="2xl">
            Les membres
          </AppText>
          <AppText size="xs" color="gray">
            Les informations concernants les membres de votre club
          </AppText>
        </div>
        <div className="flex gap-4">
          <AppButton
            onClick={() => {
              navigate("import-excel");
            }}
          >
            <Upload size={16} />
            <AppText color="white" size="xs">
              Importer un ficher excel
            </AppText>
          </AppButton>
          <AppButton onClick={() => setAddMembreDialog(true)}>
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
          className="text-xs rounded-[20px] pl-8 max-w-[450px] bg-white"
        />
        <div className="absolute top-2.5 left-2">
          <SearchIcon color="gray" size={16} />
        </div>
      </div>
      {membres.length ? (
        <Table
          className="mt-8"
          onClickTrash={hanleOnDelete}
          onClickEdit={handleOnEdit}
          tableHeader={tableHeader}
          tableData={membres}
        />
      ) : (
        <div className="mt-8">
          <AppText size="sm" weight="semibold">
            Vous n' avez pas encore de membre
          </AppText>
        </div>
      )}
      <AddMemberDialog
        isOpen={addMembreDialog}
        setIsOpen={setAddMembreDialog}
      />
      <DeleteConfirmationDialog
        isOpen={deleteConfirmationDialog}
        setIsOpen={setDeleteConfirmationDialog}
      />
      <EditMemberDialog
        isOpen={editMembreDialog}
        setIsOpen={setEditMembreDialog}
      />
      <Outlet />
    </section>
  );
}

export default Membre;
